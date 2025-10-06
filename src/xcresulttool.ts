import { exec } from '@actions/exec'
import { promises } from 'fs'
const { readFile } = promises

export class XCResultTool {
  static async version(): Promise<{
    version: string
    schemaVersion?: string | null
    formatVersion?: string | null
  }> {
    let output = ''

    const options = {
      silent: true,
      listeners: {
        stdout: (data: Buffer) => {
          output += data.toString()
        }
      }
    }

    await exec('xcrun', ['xcresulttool', 'version'], options)

    // Handles:
    // - "xcresulttool version 25, format version 3.51"
    // - "xcresulttool version 24056, schema version: 0.1.0 (legacy commands format version: 3.54)"
    // - "xcresulttool version 26.0 (format 3.60)"
    const versionMatch = output.match(
      /xcresulttool(?: version)? (\d+(?:\.\d+)?)(?:, schema version: ([\d.]+))?(?:.*format(?: version)?:? ([\d.]+))?/i
    )

    if (!versionMatch) {
      throw new Error(`Failed to parse version string: ${output}`)
    }

    const version = versionMatch[1]
    const schemaVersion = versionMatch[2] || null
    const formatVersion = versionMatch[3] || null

    return { version, schemaVersion, formatVersion }
  }

  static async json(xcResultPath: string, reference?: string): Promise<string> {
    const versionInfo = await this.version()
    const args = ['xcresulttool', 'get', '--path', xcResultPath, '--format', 'json']

    if (reference) {
      args.push('--id', reference)
    }

    // Determine if --legacy flag is required
    // - Old Xcode: formatVersion like "3.51" → numeric compare
    // - New Xcode 16: only "schema version" available → always requires --legacy
    const needsLegacy =
      (versionInfo.formatVersion && parseFloat(versionInfo.formatVersion) > 3.49) ||
      (!versionInfo.formatVersion && !!versionInfo.schemaVersion)

    if (needsLegacy) {
      args.push('--legacy')
    }

    let output = ''
    const options = {
      silent: true,
      listeners: {
        stdout: (data: Buffer) => {
          output += data.toString()
        }
      }
    }

    await exec('xcrun', args, options)
    return output
  }

  static async export(
    xcResultPath: string,
    outputPath: string,
    reference: string
  ): Promise<Buffer> {
    const versionInfo = await this.version()
    const args = [
      'xcresulttool',
      'export',
      '--type',
      'file',
      '--path',
      xcResultPath,
      '--output-path',
      outputPath,
      '--id',
      reference
    ]

    // Determine if --legacy flag is required
    // - Old Xcode: formatVersion like "3.51" → numeric compare
    // - New Xcode 16: only "schema version" available → always requires --legacy
    const needsLegacy =
      (versionInfo.formatVersion && parseFloat(versionInfo.formatVersion) > 3.49) ||
      (!versionInfo.formatVersion && !!versionInfo.schemaVersion)

    if (needsLegacy) {
      args.push('--legacy')
    }

    const options = { silent: true }

    try {
      await exec('xcrun', args, options)
      return Buffer.from(await readFile(outputPath))
    } catch (error) {
      const command = `xcrun ${args.join(' ')}`
      throw new Error(`The command "${command}" failed with error: ${(error as Error).message}`)
    }
  }
}
