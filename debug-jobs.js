
async function getManatalJobs() {
    try {
        const baseApiUrl = 'https://api.manatal.com/open/v3/career-page/ppl/jobs/';
        let allJobs = [];
        let nextUrl = baseApiUrl;

        while (nextUrl) {
            console.log(`Fetching: ${nextUrl}`);
            const response = await fetch(nextUrl, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                console.error(`Failed to fetch jobs: ${response.status} ${response.statusText}`);
                break;
            }

            const data = await response.json();
            allJobs = allJobs.concat(data.results);
            nextUrl = data.next;
        }

        console.log(`Total jobs fetched: ${allJobs.length}`);
        if (allJobs.length > 0) {
            console.log("First Job Object (Full Structure):");
            console.log(JSON.stringify(allJobs[0], null, 2));
        }
        allJobs.forEach(job => {
            console.log(`Job: ${job.position_name}, ID: ${job.id}, Hash: ${job.hash}`);
        });

    } catch (error) {
        console.error("Error:", error);
    }
}

getManatalJobs();
