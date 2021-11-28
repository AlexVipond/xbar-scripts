const got = require('got')
const dotenv = require('dotenv')

dotenv.config()

async function getBalance () {
  const transactions = []
  let itemsOnLastPage = 1
  let page = 1

  while(itemsOnLastPage > 0) {
    const response = await got.get(`https://vendors.paddle.com/api/2.0/product/${process.env.PADDLE_PRODUCT_ID}/transactions?vendor_auth_code=${process.env.PADDLE_VENDOR_AUTH_CODE}&vendor_id=${process.env.PADDLE_VENDOR_ID}&page=${page}`)
    const t = JSON.parse(response.body).response
    itemsOnLastPage = t.length
    transactions.push(...t)    
    page++
  }

  console.log(`📖 ${transactions.length}`)
}

getBalance()

