/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface ActionRunDestinationRecord {
  displayName: string
  targetArchitecture: string
  targetDeviceRecord: ActionDeviceRecord
  localComputerRecord: ActionDeviceRecord
  targetSDKRecord: ActionSDKRecord
}
export interface ActionDeviceRecord {
  name: string
  isConcreteDevice: boolean
  operatingSystemVersion: string
  operatingSystemVersionWithBuildNumber: string
  nativeArchitecture: string
  modelName: string
  modelCode: string
  modelUTI: string
  identifier: string
  isWireless: boolean
  cpuKind: string
  cpuCount?: number
  cpuSpeedInMHz?: number
  busSpeedInMHz?: number
  ramSizeInMegabytes?: number
  physicalCPUCoresPerPackage?: number
  logicalCPUCoresPerPackage?: number
  platformRecord: ActionPlatformRecord
}
export interface ActionPlatformRecord {
  identifier: string
  userDescription: string
}
export interface ActionSDKRecord {
  name: string
  identifier: string
  operatingSystemVersion: string
  isInternal: boolean
}
