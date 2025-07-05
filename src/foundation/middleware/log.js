export default async (req, res, next) => {
    console.log('Log Start');
    await next();
    console.log('Log End');
}