import Elysia from 'elysia'
import { authentication } from '../middlewares/authentication'
import { db } from '@/server/db/connection'

export const getManagedRestaurant = new Elysia()
  .use(authentication)
  .get('/managed-restaurant', async ({ getManagedRestaurantId }) => {
    const restaurantId = await getManagedRestaurantId()

    const restaurant = await db.query.restaurants.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, restaurantId)
      },
    })

    if (!restaurant) {
      throw new Error('Restaurant not found.')
    }

    return restaurant
  })
