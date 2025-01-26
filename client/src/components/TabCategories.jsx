import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import axios from 'axios'

const TabCategories = () => {
  const [jobs,setJobs] = useState([])
  useEffect(()=>{
    const getData = async()=>{
      const {data} = await axios(`${import.meta.env.VITE_API_URL}/jobs`)
      setJobs(data)
    }
    getData()
  },[])
  return (
    <Tabs>
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-center capitalize text-gray-800 xl:text-3xl">Browse Jobs By Category</h1>
        <p className="max-w-2xl mx-auto my-6 text-center text-gray-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo explicabo, numquam sed accusantium laudantium sapiente quia veritatis inventore impedit ut molestiae! Earum cum.</p>
      <div className="flex justify-center items-center">
      <TabList>
        <Tab>Web Development </Tab>
        <Tab>Graphic Design</Tab>
        <Tab>Digital Marketing</Tab>
      </TabList>
      </div>

      <TabPanel>
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {
            jobs.filter(j=>j.category === "Web Development").map(job=>{
              return <JobCard key={job._id} job={job}/>
            })
          }
        </div>
      </TabPanel>
      <TabPanel>
      <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {
            jobs.filter(j=>j.category === "Graphic Design").map(job=>{
              return <JobCard key={job._id} job={job}/>
            })
          }
        </div>
      </TabPanel>
      <TabPanel>
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {
            jobs.filter(j=>j.category === "Digital Marketing").map(job=>{
              return <JobCard key={job._id} job={job}/>
            })
          }
        </div>
      </TabPanel>
      </div>
    </Tabs>
  );
};

export default TabCategories;
