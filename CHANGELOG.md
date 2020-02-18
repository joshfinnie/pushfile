# Changelog

1.1.5
---

* Package updates
    * Bump aws-sdk to 2.620.0
    * Bump clipboardy to 2.2.0
    * Bump commander to 4.1.1
    * Bump hashids to 2.2.1
    * Bump inquirer to 7.0.4
    * Bump mime-types to 2.1.26
    * Bump @babel/cli to 7.8.4
    * Bump @babel/core to 7.8.4
    * Bump @babel/polyfill to 7.8.3
    * Bump @babel/preset-env to 7.8.4
    * Bump @babel/register to 7.8.3
    * Bump eslint to 6.8.0
    * Bump eslint-config-prettier to 6.10.0
    * Bump elsint-plugin-import to 2.20.1
    * Bump mocha to 7.0.1
    * Bump rollup to 1.31.1
    * Bump rollup-plugin-terser to 5.2.0
    * Bump uglify-js to 3.8.0

1.1.4
---

* Converting some calls to Promises for future conversion to async.
* Converted eslint airbnb config to use the "base" version since I do not use react.
* Package updates
    * Bump aws-sdk to 2.597.0
    * Bump rollup to 1.27.14
    * Bump @babel/register to 7.7.7
    * Bump @babel/preset-env to 7.7.7
    * Bump @babel/core to 7.7.7
    * Bump @babel/cli to 7.7.7
    * Bump hashids to 2.1.0
    * Bump prettier to 1.19.1
    * Bump mime-types to 2.1.25
    * Bump chalk to 3.0.0
    
1.1.3
---

* Packgage updates
    * Bump @babel/cli to 7.7.0
    * Bump @babel/core to 7.7.2
    * Bump @babel/preset-env to 7.7.1
    * Bump @babel/register to 7.7.0
    * Bump aws-sdk to 2.576.0
    * Bump commander to 4.0.1
    * Bump eslint-config-prettier to 6.7.0
    * Bump rollup to 1.27.3
    * Bump uglify-js to 3.6.9 

1.1.2
---

* Packgage updates
    * Bump @babel/cli to 7.6.4
    * Bump @babel/core to 7.6.4
    * Bump @babel/preset-env to 7.6.3
    * Bump aws-sdk to 2.550.0
    * Bump commander to 3.0.2
    * Bump eslint-config-prettier to 6.4.0
    * Bump eslint-plugin-react to 7.16.0
    * Bump mocha to 6.2.1
    * Bump rollup to 1.24.0
    * Bump uglify-js to 3.6.2

1.1.1
---

* Package updates
    * Bump eslint-config-prettier to 6.3.0
    * Bump hashids to 2.0.1
    * Bump rollup to 1.21.4
    * Bump eslint-plugin-prettier to 3.1.1
    * Bump @babel/cli to 7.6.2
    * Bump aws-sdk to 2.537.0
    * Bump @babel/core to 7.6.2
    * Bump @babel/preset-env to 7.6.2
    * Bump @babel/register to 7.6.2
    * Bump rollup-plugin-terser to 5.1.2

1.1.0
---

* Package updates
    * Bump hashids to 2.0.0
    * Bump commander to 3.0.1
    * Bump eslint-config-prettier to 6.2.0
    * Bump aws-sdk to 2.522.0
    * Bump rollup to 1.20.3
    * Bump rollup-plugin-commonjs to 10.1.0
    * Bump inquirer to 7.0.0
    * Bump figlet to 1.2.4
    * Bump eslint-utils to 1.4.2

Both `commander` and `hashids` had changes to their APIs. This does not effect our API, but might effect custom commands for users.

1.0.4
---

* Package updates
    * Bump aws-sdk from 2.492.0 to 2.493.0
    * Bump rollup from 1.16.7 to 1.17.0

1.0.3
---

1.0.2
---

1.0.1
---

1.0.0
---

* Implemented Dependabot for security updates
* Finalized Development workstream
* Updated dependencies
* Reached point where v1 release makes sense.

**Will follow SEMVER from now on**

0.6.1
---

* Updated dependencies.
* swapped out `copy-paste` for `clipboardy`.

0.6
---

0.5
---

0.4
---

* Replaced `Optimist` with `nomnom` for command line args parsing.
* Bumped all versions and updated AWS SDK to use `upload` instead of `push`.

0.3
---

* Implenmeted PushFile using the native AWS SDK instead of out-dated package.

0.2
---

* Implemented feature that turns all pushed files public by default.

0.1
---

* Initial Release.
