import React, { useState, useEffect } from "react";
import Search from "../common/SearchForm";
import JoblyApi from "../api/api";
import JobCardList from "./JobCardList";
import LoadingSpinner from "../common/LoadingSpinner";


/** Show page with list of jobs
 * On mount, loads jobs from API.
 * Re-loads filtered jobs on submit from search form.
 *
 * JobList -> JobCardList -> JobCard
 *
 * This is routed at /jobs
*/

function JobList() {
  console.debug("JobList");
  const [jobs, setJobs ] = useState(null);
  useEffect(function getAllJobsMount() {
    console.debug('JobList useEffect getAllJobsOnMount');
    search();
  }, []);

  async function search(title) {
    let jobs = await JoblyApi.getJobs(title);
    setJobs(jobs);
  }

  if (!jobs) return <LoadingSpinner />;
  return (
    <div className="jobList col-md-8">
      <Search searchFor={search} />
      {jobs.length
      ? <JobCardList jobs={jobs} />
      : <p className="lead">Sorry no results were found.</p>
    }
    </div>
  );
}

export default JobList;