import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'xy8xfu7q',
    dataset: 'production'
  },
  // Hosted Studio URL: https://lisateo.sanity.studio — where Lisa logs in to edit.
  studioHost: 'lisateo',
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'xy5ndlkxdoezs4s5exil1j6f',
  },
})
