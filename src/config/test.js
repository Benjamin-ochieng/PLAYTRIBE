const testConfig = {
  secrets: {
    jwt: process.env.JWT,
  },
  dbUrl: process.env.TEST_DBURL,
}

export default testConfig
