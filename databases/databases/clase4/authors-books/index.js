const { sequelize } = require('./connection');
const { Author, Book } = require('./models');

const createAuthor = async () => {
  try {
    const name = 'itziar';
    const age = '39';
    const result = await Author.create({ name, age });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const createBook = async (newAuthorId) => {
  const isbn = '1234';
  const title = 'Don Quijote';
  const cantPages = 500;
  try {
    await Book.create({
      isbn,
      name: title,
      cantPages,
      authorId: newAuthorId,
    });
  } catch (error) {
    console.log(error);
  }
};

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection success');
    sequelize.sync();
  })
  .then(() => {
    console.log('Sync models');
    createAuthor()
      .then((newAuthor) => {
        if (newAuthor) createBook(newAuthor.id);
      });
  })
  .catch((error) => {
    console.error('Connection fail', error);
  });
