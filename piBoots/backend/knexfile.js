module.exports = {

    development: {
      client: 'sqlite3',
      connection: {
        filename: './src/database/banco.sqlite'
      },

      useNullAsDefault: true,
    }
  }