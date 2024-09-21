# `xcresult` GitHub Action

<a href="https://github.com/lunij/xcresult/actions"><img src="https://github.com/lunij/xcresult/workflows/main.yml/badge.svg"></a>

A GitHub Action that generates a human-readable test report from the Xcode result bundle and shows it on GitHub Checks.

The result is formatted into a test report that shows the success or failure of the tests, code coverages, logs, activities, and saved screenshots.

### Pre-Requisites

This action is **supported only on macOS runners**, as it requires access to the `xcrun` command-line tool.

By default `xcodebuild` will generate the `xcresult` bundle to a randomly named directory in `DerivedData`. With the `-resultBundlePath` flag `xcodebuild` will move the `xcresult` bundle to the path you specified.

# Usage

> For complete input/output documentation, see [action.yml](action.yml).

## Example

```yaml
jobs:
  test:
    runs-on: macos-latest
    name: Test
    steps:
      - uses: actions/checkout@v4
      - name: Run Tests
        run: xcodebuild -scheme MyFramework -resultBundlePath TestResults test
      - uses: lunij/xcresult@v1
        if: success() || failure()
        with:
          path: TestResults.xcresult
```

## Input parameters

```yaml
- uses: lunij/xcresult@v1
  with:
    # Path to the xcresult bundle (required)
    path: 'TestResults.xcresult'

    # Title for the created GitHub Check (required)
    title:

    # The GitHub authentication token to create the check.
    #
    # Default: ${{ github.token }}
    token: ''

    # Whether to show the details of passed tests;
    # if false, only failed tests will be reported in detail section.
    #
    # Default: true
    show-passed-tests:

    # Show code coverage if coverage data exists.
    #
    # Default: true
    show-code-coverage:

    # Show code coverage for all files if coverage data exists and `show-code-coverage` is true.
    # When `false` it shows the code coverage of targets/libraries only.
    #
    # Default: true
    show-file-coverage:

    # Show summaries for all test classes
    #
    # Default: false
    show-test-summaries:

    # Show details for all test classes
    #
    # Default: false
    show-test-details:

    # Upload the xcresult bundle(s). Possible values: always, failure, never
    #
    # Default: 'failure'
    upload:
```

## Limitations

GitHub Checks has a maximum text limit of 65535 characters. Currently, any text longer than that will be automatically truncated.

There is a limit of 50 annotations in GitHub Checks. Currently, any annotations longer than that will be automatically truncated.

**You can set the `show-passed-tests` option to `false` to reduce the output to avoid the limitation.**
