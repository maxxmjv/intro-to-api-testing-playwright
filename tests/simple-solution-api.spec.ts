import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

test('get order with correct id should receive code 200', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders/1')

  const responseBody = await response.json()
  const statusCode = response.status()

  console.log('response body:', responseBody)
  expect(statusCode).toBe(200)
})

test('post order with correct data should receive code 201', async ({ request }) => {

  const requestBody = {
    status: 'OPEN',
    courierId: 0,
    customerName: 'string',
    customerPhone: 'string',
    comment: 'string',
    id: 0,
  }

  const response = await request.post('https://backend.tallinn-learning.ee/test-orders', {
    data: requestBody,
  })

  const responseBody = await response.json()
  const statusCode = response.status()

  
  console.log('response status:', statusCode)
  console.log('response body:', responseBody)
  expect(statusCode).toBe(StatusCodes.OK)
 
  expect(typeof responseBody.comment).toBe('string')
 
  expect(typeof responseBody.courierId).toBe('number')
})
