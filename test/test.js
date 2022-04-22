import assert from 'assert'
import * as util from '../lib/util.js'

async function test() {
  await testExecute()
  await testSleep()
  testLog()
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

function testLog() {
  util.log('error', 'this is an error')
  util.log('info', 'this is an info')
  util.log(null, 'this is whatever log data')
}

test().catch(err => util.log('error', err))

