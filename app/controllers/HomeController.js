const dbDriver = require('../helpers/DbDriver')
const JobOffer = dbDriver.JobOffer

exports.showJobOffer = async (req, res, next) => {
  const jobOfferList = await JobOffer.find().lean()
  if (!jobOfferList) {
    return next()
  }

  res.render('home/job-offer-published', {
    pageTitle: 'Job Offer List',
    tagLine: 'Find and Post Jobs for Web Developers',
    bar: true,
    publishVacancy: true,
    jobOfferList
  })
}
