import React, { memo } from 'react'
import Banner from '../components/Banner'
import CTA from '../components/CTA'
import Categories from '../components/Categories'
import Companies from '../components/Companies'
import FeaturedJobs from '../components/FeaturedJobs'
import How from '../components/How'
import Testimonials from '../components/Testimonials'
import TopCompanies from '../components/TopCompanies'

const Home = () => {
  return (
    <>
    <Banner/>
    <Companies/>
    <How/>
    <Categories/>
    <FeaturedJobs/>
    <TopCompanies/>
    <Testimonials/>
    <CTA/>
    </>
  )
}

export default memo(Home)