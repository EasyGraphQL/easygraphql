const snippets = [
  {
    name: 'easygraphql-parser',
    snippet: `'use strict';

const easygraphqlParser = require('easygraphql-parser');
const fs = require('fs');
const path = require('path');

const familySchema = fs.readFileSync(path.join(__dirname, 'family.gql'), 'utf8');

const parsedSchema = easygraphqlParser(familySchema);
    `
  },
  {
    name: 'easygraphql-tester',
    snippet: `'use strict';

const EasyGraphQLTester = require('easygraphql-tester');
const fs = require('fs');
const path = require('path');

const userSchema = fs.readFileSync(path.join(__dirname, 'user.gql'), 'utf8');

const tester = new EasyGraphQLTester(userSchema);
    `
  },
  {
    name: 'easygraphql-load-tester',
    snippet: `'use strict';

const EasyGraphQLLoadTester = require('easygraphql-load-tester');
const fs = require('fs');
const path = require('path');

const userSchema = fs.readFileSync(path.join(__dirname, 'user.gql'), 'utf8');

const loadTester = new EasyGraphQLLoadTester(userSchema);
    `
  },
  {
    name: 'easygraphql-mock',
    snippet: `'use strict';

const easygraphqlMock = require('easygraphql-mock');
const fs = require('fs');
const path = require('path');

const userSchema = fs.readFileSync(path.join(__dirname, 'user.gql'), 'utf8');

const mockedSchema = easygraphqlMock(userSchema);
    `
  }
]

module.exports = snippets