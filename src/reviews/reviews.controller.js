const service = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const foundReview = await service.read(reviewId);
    if (foundReview) {
        res.locals.review = foundReview;
        return next();
    }
    return next({
        status: 404, 
        message: "Review cannot be found."
    });
};

async function destroy(req, res) {
    await service.delete(res.locals.review.review_id);
    res.sendStatus(204);
}

async function update(req, res) {
    const updatedReview = { ...res.locals.review, ...req.body.data };
    await service.update(updatedReview);
    const returnData = await service.addCriticToReview(
      res.locals.review.review_id
    );
    res.json({ data: returnData });
  }

module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
}