import { expect, test } from '@playwright/test'
import { OrderDTO } from '../src/DTO/OrderDTO'
import { createOrder, getJwt, getOrderById } from '../src/helpers/api-helper'

const ORDERS_URL = 'https://backend.tallinn-learning.ee/orders'

test.describe('Order API Operations', () => {
  let token: string

  test.beforeAll(async ({ playwright }) => {
    const request = await playwright.request.newContext()
    token = await getJwt(request)
  })

  test.describe('POST /orders', () => {
    test('create order with correct data - 200', async ({ request }) => {
      const requestBody = OrderDTO.generateDefaultBody()
      const responseBody = await createOrder(request, token, requestBody)

      expect(responseBody.id).toBeDefined()
      expect(responseBody.customerName).toBe(requestBody.customerName)
    })
  })

  test.describe('GET /orders/{id}', () => {
    test('get order info by its id - 200', async ({ request }) => {
      const createdOrder = await createOrder(request, token, OrderDTO.generateDefaultBody())
      const foundOrder = await getOrderById(request, token, createdOrder.id)

      expect(foundOrder.id).toBe(createdOrder.id)
    })


    test('get order that does not exist - 404', async ({ request }) => {
      const response = await request.get(`${ORDERS_URL}/999999`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      expect(response.status()).toBe(404)
    })
  })

  test.describe('PUT /orders/{id}/status', () => {
    test('student cannot change order status - 403', async ({ request }) => {
      const order = await createOrder(request, token, OrderDTO.generateDefaultBody())

      const response = await request.put(`${ORDERS_URL}/${order.id}/status`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { status: 'OPEN' },
      })

      expect(response.status()).toBe(403)
    })
  })

  test.describe('DELETE /orders/{id}', () => {
    test('delete order with correct id and token - 200', async ({ request }) => {
      const token = await getJwt(request)
      const createdOrder = await createOrder(request, token, OrderDTO.generateDefaultBody())

      const response = await request.delete(`${ORDERS_URL}/${createdOrder.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const responseBody = await response.json()
      expect(responseBody).toBe(true)
      expect(response.status()).toBe(200)
    })

    test('delete order with non-existent ID - 200', async ({ request }) => {
      const token = await getJwt(request)

      const response = await request.delete(`${ORDERS_URL}/9999999`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const responseBody = await response.json()
      expect(responseBody).toBe(true)
      expect(response.status()).toBe(200)
    })
  })
})