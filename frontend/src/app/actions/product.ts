'use server'

import { getProducts as fetchExternalProducts } from '@/lib/products'
import { getSession } from '@/lib/auth-utils'
import { revalidatePath } from 'next/cache'

// Fetch products from external API
export async function getProducts() {
  const session = await getSession()
  const token = session?.user?.access_token
  return await fetchExternalProducts(undefined, token)
}

// Upload product image
export async function uploadProductImage(productId: number, formData: FormData) {
  const session = await getSession()
  const token = session?.user?.access_token

  if (!token) {
    throw new Error('You must be logged in to upload images')
  }

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.wayneven.uk'
  const url = `${API_BASE_URL}/api/v1/catalog/products/${productId}`

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `Upload failed: ${response.statusText}`)
    }

    revalidatePath(`/product/${productId}`)
    return await response.json()
  } catch (error: any) {
    console.error('Failed to upload image:', error)
    throw error
  }
}

// Delete product image
export async function deleteProductImage(productId: number, imageId: number) {
  const session = await getSession()
  const token = session?.user?.access_token

  if (!token) {
    throw new Error('You must be logged in to delete images')
  }

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.wayneven.uk'
  const url = `${API_BASE_URL}/api/v1/catalog/products/${productId}`

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `Delete failed: ${response.statusText}`)
    }

    revalidatePath(`/product/${productId}`)
    return { success: true }
  } catch (error: any) {
    console.error('Failed to delete image:', error)
    throw error
  }
}

// Example: Server Action to add a product to cart
export async function addToCart(productId: string, quantity: number) {
  const session = await getSession()

  if (!session || !session.user) {
    throw new Error('You must be logged in to add items to cart')
  }

  // NOTE: For now, we are just simulating the cart logic as we've moved
  // to a custom PostgreSQL database.
  // You would typically insert into a 'cart_items' table in your PostgreSQL DB.
  
  console.log(`Adding product ${productId} to cart for user ${session.user.id}`);

  // Revalidate the path so the UI updates
  revalidatePath('/cart')
  
  return { success: true }
}

// Example: Age Verification (20+) Check Server Action
export async function checkAgeRequirement(birthDateString: string) {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 20) {
    return { allowed: false, message: 'You must be at least 20 years old to purchase alcohol.' };
  }

  // Optionally, save this verified status to user profile in PostgreSQL
  const session = await getSession()
  if (session && session.user) {
    // await query('UPDATE users SET is_age_verified = true WHERE id = $1', [session.user.id]);
  }

  return { allowed: true };
}
