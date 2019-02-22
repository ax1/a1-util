const assert = require('assert')
const util = require('../lib/util')

async function test() {
  const text = await util.execute('node -v')
  assert.ok(text.length > 0)
}

test().catch(err => util.logError(err))

