export default async (req, res, next) => {
    console.log('Translation Start');
    await next();
    console.log('Translation End');
}