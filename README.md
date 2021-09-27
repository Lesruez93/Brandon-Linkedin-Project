

## Usage

### Clone

```shell
git clone https://github.com/tonyxu-io/React-Linkedin-Login.git
```

### Install Dependencies

Install dependencies for server

```shell
cd React-Linkedin-Login
npm install
```

Install dependencies for client

```shell
cd client
npm install
```

### Get LinkedIn App Credential from LinkedIn Developer Portal

- client_id
- client_secret

Configure 'http://localhost:3001/callback' as Oauth2.0 redirect uri

### Create Environment Variables

/React-Linkedin-Login/.env

```shell
EXPRESS_APP_CLIENT_ID=${Your-Client-ID}
EXPRESS_APP_CLIENT_SECRET=${Your-Client-Secret}
EXPRESS_APP_REDIRECT_URI=http://localhost:3001/callback
```

/React-Linkedin-Login/client/.env

```shell
REACT_APP_CLIENT_ID=${Your-Client-ID}
REACT_APP_REDIRECT_URI=http://localhost:3001/callback
```

### Build Client

/React-Linkedin-Login/client:

```shell
yarn run build
```

### Start Server

/React-Linkedin-Login/:

```shell
PORT=3001 npm start
```

After Authentication the app pulls data from on the below function
```
requestsDetails(profile){
  let  options = {
      method: 'GET',
      url: 'https://linkedin9.p.rapidapi.com/search_people',
      params: {keywords: this.state.firstName + ' ' + this.state.lastName},
      headers: {
        'x-rapidapi-host': 'linkedin9.p.rapidapi.com',
        'x-rapidapi-key': 'a70a0f84e5msh225bf5f17660a4bp1729ecjsn6e0199ba94c8'
      }
    };
    axios.request(options).then( (response)=> {

      this.queryMoreDetails(response.data[0].publicIdentifier)

     // this.setState({data: response.data});
    }).catch(function (error) {
      console.error(error);
    });
  }
```

After data is fetched the app also make a post request on the function below

```
  queryMoreDetails = (publicIdentifier) => {
    let  options = {
      method: 'POST',
      url: 'http://localhost:3001/callback/user',
      body: {
        'i': publicIdentifier,
      }
    };
    axios.request(options).then( (response)=> {
      console.log(response.data);
      localStorage.setItem('user',JSON.stringify(response))

      // this.setState({data: response.data});

    }).catch(function (error) {
      console.error(error);
    });

  }

```
The function above  returns the data below

```
{public_identifier: "lester-rusike-a27192a7",…}
accomplishment_courses: []
accomplishment_honors_awards: []
accomplishment_organisations: []
accomplishment_patents: []
accomplishment_projects: []
accomplishment_publications: []
accomplishment_test_scores: []
activities: [{title: "Do we agree?", link: "https://www.linkedin.com/signup/cold-join",…}, {,…}, {,…}]
0: {title: "Do we agree?", link: "https://www.linkedin.com/signup/cold-join",…}
activity_status: "Liked by Lester Rusike"
link: "https://www.linkedin.com/signup/cold-join"
title: "Do we agree?"
1: {,…}
activity_status: "Liked by Lester Rusike"
link: "https://www.linkedin.com/signup/cold-join"
title: "I am super happy to be joining trivago as an Android Engineer!I would like to thank Angela Alesci for a wonderful recruitment process. I look…"
2: {,…}
activity_status: "Liked by Lester Rusike"
link: "https://www.linkedin.com/signup/cold-join"
title: "One of my freinds got retrenched about 2 years back and I congratulated him for it, he jus sent me his quarterly financials for peer review, I…"
articles: []
background_cover_image_url: "https://s3.us-west-000.backblazeb2.com/proxycurl/person/lester-rusike-a27192a7/cover?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=0004d7f56a0400b0000000001%2F20210927%2Fus-west-000%2Fs3%2Faws4_request&X-Amz-Date=20210927T192355Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=3f8e24b4f45a8f2cef40106f4b2bfe1f1b55c44a5f1e92923e6c2394c891396f"
certifications: []
city: null
connections: 184
country: "ZW"
country_full_name: "Zimbabwe"
education: [{starts_at: {day: 1, month: 1, year: 2013}, ends_at: {day: 31, month: 12, year: 2016},…}]
0: {starts_at: {day: 1, month: 1, year: 2013}, ends_at: {day: 31, month: 12, year: 2016},…}
degree_name: null
description: null
ends_at: {day: 31, month: 12, year: 2016}
day: 31
month: 12
year: 2016
field_of_study: null
logo_url: "https://media-exp1.licdn.com/dms/image/C4D0BAQHQGraSPyOK1w/company-logo_100_100/0/1602830241962?e=1639612800&v=beta&t=fhsEE6NvaUpVojzsN-QQ8JC5vv81ml4Mcjj7aO4Hpqw"
school: "Midlands State University"
starts_at: {day: 1, month: 1, year: 2013}
experiences: [{starts_at: {day: 1, month: 2, year: 2019}, ends_at: null, company: "361ict",…},…]
0: {starts_at: {day: 1, month: 2, year: 2019}, ends_at: null, company: "361ict",…}
company: "361ict"
company_linkedin_profile_url: null
description: null
ends_at: null
location: "Johannesburg Area, South Africa"
logo_url: null
starts_at: {day: 1, month: 2, year: 2019}
title: "Mobile Application Developer"
1: {starts_at: {day: 1, month: 2, year: 2019}, ends_at: null, company: "Disciplesoft",…}
company: "Disciplesoft"
company_linkedin_profile_url: null
description: null
ends_at: null
location: "Harare"
logo_url: null
starts_at: {day: 1, month: 2, year: 2019}
day: 1
month: 2
year: 2019
title: "Mobile Application Developer"
2: {starts_at: {day: 1, month: 11, year: 2017}, ends_at: null, company: "Disciplesoft",…}
company: "Disciplesoft"
company_linkedin_profile_url: null
description: null
ends_at: null
location: "Harare"
logo_url: null
starts_at: {day: 1, month: 11, year: 2017}
day: 1
month: 11
year: 2017
title: "Mobile Application Developer"
3: {starts_at: {day: 1, month: 1, year: 2015}, ends_at: null, company: "Muzinda Hub",…}
company: "Muzinda Hub"
company_linkedin_profile_url: "https://zw.linkedin.com/company/muzinda-hub"
description: null
ends_at: null
location: "Harare"
logo_url: "https://media-exp1.licdn.com/dms/image/C4E0BAQGVXVWPaLBk-A/company-logo_100_100/0/1519877845475?e=1639612800&v=beta&t=f8xSdkwO5FP4Ghyq9gJOEp_kapsNi3jMXYNbeUbUdNk"
starts_at: {day: 1, month: 1, year: 2015}
day: 1
month: 1
year: 2015
title: "Web Software Developer"
first_name: "Lester"
full_name: "Lester Rusike"
headline: "Android & IOS App Developer"
languages: []
last_name: "Rusike"
occupation: "Mobile Application Developer at 361ict"
people_also_viewed: [{link: "https://zw.linkedin.com/in/marlon-magonjo-273023ab", name: "Marlon Magonjo",…},…]
profile_pic_url: "https://s3.us-west-000.backblazeb2.com/proxycurl/person/lester-rusike-a27192a7/profile?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=0004d7f56a0400b0000000001%2F20210927%2Fus-west-000%2Fs3%2Faws4_request&X-Amz-Date=20210927T192355Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=4ae1f123a0f736c5913a7d3b7759e751e760612adcfb3762857072907bf84bf9"
public_identifier: "lester-rusike-a27192a7"
recommendations: []
similarly_named_profiles: [{name: "lester rusike", link: "https://zw.linkedin.com/in/lester-rusike-ba195353",…},…]
state: null
summary: "Passionate Mobile App and  Front-End  Developer ."
volunteer_work: []
```

Visit `http://localhost:3001/` in your browser.

## Consumed SDK/API

- [LinkedIn OAuth 2.0 (3-Legged)](https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin/consumer/context)
- [Sign In with LinkedIn](https://docs.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin?context=linkedin/consumer/context)

