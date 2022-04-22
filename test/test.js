import assert from 'assert'
import * as util from '../lib/util.js'

async function test() {
  await testExecute()
  await testSleep()
}

async function testExecute() {
  const text = await util.execute('node -v')
  assert.ok(text.length > 0)
}

async function testSleep() {
  console.log('1')
  await util.sleep(1000)
  console.log('2')
}

test().catch(err => util.logError(err))

