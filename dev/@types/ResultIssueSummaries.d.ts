/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface ResultIssueSummaries {
  analyzerWarningSummaries: IssueSummary[]
  errorSummaries: IssueSummary[]
  testFailureSummaries: TestFailureIssueSummary[]
  warningSummaries: IssueSummary[]
}
export interface IssueSummary {
  issueType: string
  message: string
  producingTarget?: string
  documentLocationInCreatingWorkspace?: DocumentLocation
}
export interface DocumentLocation {
  url: string
  concreteTypeName: string
}
export interface TestFailureIssueSummary {
  issueType: string
  message: string
  producingTarget?: string
  documentLocationInCreatingWorkspace?: DocumentLocation
  testCaseName: string
}
