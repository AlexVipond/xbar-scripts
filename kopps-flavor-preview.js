const { chromium } = require('playwright')
const addDays = require('date-fns/addDays')

const favoriteFlavors = [
  'Grasshopper Fudge',
  'Heath Bar®',
  'Cherry Amaretto Cheesecake',
  'Turtle Sundae',
  'Red Raspberry',
]

async function koppsFlavorPreview () {
  const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' })
  const page = await browser.newPage()
  await page.goto('https://kopps.com/flavor-preview')
  const flavors = await page.evaluate(() => {
    return [...document.querySelectorAll('.flavor-forecast')]
      .slice(0, 7)
      .map(el => [...el.querySelectorAll('.flavor-of-day')]
        .map(el => el.textContent.trim())
      )
  })

  let forecast = ''
  for (i = 0; i < 7; i++) {
    if (forecast) forecast += '\n'
    
    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(addDays(new Date(), i)).toUpperCase(),
          date = addDays(new Date(), i).getDate()

    forecast += `${weekday}: | color=white | size=12 | href=https://kopps.com/flavor-preview#${date.toString().length === 1 ? '0' + date : date}`
    
    for (j = 0; j < flavors[i].length; j++) {
      forecast += `\n    ${flavors[i][j]} | color=${favoriteFlavors.includes(flavors[i][j]) ? '#22C55E' : '#F4F4F5'} | trim=false`
    }
  }

  console.log('🍦')
  console.log('---')
  console.log(forecast)

  await browser.close()
}

koppsFlavorPreview()
