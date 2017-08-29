export default {
  asset_types: [
    // {
    //   name: 'Product',
    // },
    {
      name: 'Component',
    },
    // {
    //   name: 'Business Unit',
    // },
  ],
  categories: [
    {
      name: 'Code',
      description: '',
      capabilities: [
        {
          name: 'Code Management Strategy',
          description: '',
          minimum_category_capability_level_id: 2,
          levels: [
            {
              level: 1,
              value: `Code is in SCM (e.g. git) and used for release, but there is little to no documented or agreed strategy of how to branch, merge, or release code`,
            },
            {
              level: 2,
              value: `Develop on version branches. Every deployment can be tracked back to understand all changes which went into it by anyone in the team`,
            },
            {
              level: 3,
              value: `Develop on feature branches that are short-lived (i.e. less than two weeks) and release from merged master`,
            },
            {
              level: 4,
              value: `Develop and release from master with at least daily code check-ins`,
            },
            {
              level: 5,
              value: `Develop and release from master with at least daily code check-ins`,
            },
          ],
        },
        {
          name: `Test Suite`,
          description: ``,
          minimum_category_capability_level_id: 3,
          tools: `Test Suite`,
          levels: [
            {
              level: 1,
              value: `No or some unit tests, functional tests, critical path tests, and performance tests`,
            },
            {
              level: 2,
              value: `Some unit tests, functional tests, critical path tests, performance tests with all of them passing successfully`,
            },
            {
              level: 3,
              value: `Actively builds and maintains unit tests, functional tests, critical path tests, performance tests with all of them successfully passing for positive flows`,
            },
            {
              level: 4,
              value: `Actively builds and maintains unit tests, functional tests, critical path tests, performance tests with all of them successfully passing for positive and negative flows maintaining 100% critical path coverage`,
            },
          ],
        },
        {
          name: `Logging & Telemetry`,
          description: ``,
          minimum_category_capability_level_id: 3,
          tools: `Logging & Telemetry`,
          levels: [
            {
              level: 1,
              value: `Default or customized logging and no telemetry`,
            },
            {
              level: 2,
              value: `Rudimentary logging and telemetry in place`,
            },
            {
              level: 3,
              value: `Adherence to established logging & telemetry standards

Suitable information available in logs and telemetry for troubleshooting common issues`,
            },
            {
              level: 4,
              value: `Adherence to established logging & telemetry standards

Most issues can be diagnosed through logs and telemetry`,
            },
          ],
        },
        {
          name: `Backward / Forward Compatibility`,
          description: ``,
          minimum_category_capability_level_id: 2,
          tools: `Backward / Forward Compatibility`,
          levels: [
            {
              level: 1,
              value: `Breaking changes (i.e. tested locally)`,
            },
            {
              level: 2,
              value: `Changes are regressed by users of the product prior to release`,
            },
            {
              level: 3,
              value: `Coding practices supports forward compatibility`,
            },
            {
              level: 4,
              value: `Coding practices support backward and forward compatibility`,
            },
          ],
        },
        {
          name: `Monitoring & Alerting`,
          description: ``,
          minimum_category_capability_level_id: 2,
          tools: `Monitoring & Alerting`,
          levels: [
            {
              level: 1,
              value: `Logs have enough data to set up monitoring and alerts on`,
            },
            {
              level: 2,
              value: `Some monitoring and some alerting is prioritized in the work queue`,
            },
            {
              level: 3,
              value: `Prioritization of monitoring and alerting as part of the acceptance criteria for all work

Access to log archives and telemetry is available for troubleshooting`,
            },
            {
              level: 4,
              value: `Prioritization of monitoring, alerting, and validation of triggers (e.g. SLAs) as part of the acceptance criteria for all work

Logs are indexed and telemetry is readily available for troubleshooting`,
            },
          ],
        },
        {
          name: `Build for Availability`,
          description: ``,
          minimum_category_capability_level_id: 2,
          tools: `Build for Availability`,
          levels: [
            {
              level: 1,
              value: `Product is not tested for extreme failures (e.g. a node/instance becoming unavailable)`,
            },
            {
              level: 2,
              value: `Product is manually tested for extreme failures and automatically tested for error use cases`,
            },
            {
              level: 3,
              value: `Automated resilience testing framework (e.g. Chaos Monkey) runs rampant on the product in a staging environment without failures`,
            },
            {
              level: 4,
              value: `Automated resilience testing framework (e.g. Chaos Monkey) runs rampant on the product in a staging and production environment without failures and all errors (e.g. code, web server, OS, etc...) are caught and escalated`,
            },
          ],
        },
        {
          name: `Developer can control/understands when a piece of code moves to the next environment in SDLC `,
          description: ``,
          minimum_category_capability_level_id: 3,
          tools: `Developer can control/understands when a piece of code moves to the next environment in SDLC `,
          levels: [
            {
              level: 1,
              value: `No tracking apart from build logs and git from the pipeline to the team`,
            },
            {
              level: 2,
              value: `Manual tracking`,
            },
            {
              level: 3,
              value: `Automated tracking and reporting of features that goes into builds`,
            },
            {
              level: 4,
              value: `Broadcast feature to end users`,
            },
          ],
        },
      ],
    },
    {
      name: 'Build & Test',
      capabilities: [
        {
          name: `Code Quality`,
          description: ``,
          minimum_category_capability_level_id: 2,
          tools: `Code Quality`,
          levels: [
            {
              level: 1,
              value: `Code coverage is unknown or out of date`,
            },
            {
              level: 2,
              value: `Code coverage is actively tracked`,
            },
            {
              level: 3,
              value: `80%+ code coverage is maintained`,
            },
            {
              level: 4,
              value: `90%+ code coverage is maintained or less than 20% of build rejections by regression test coverage`,
            },
          ],
        },
        {
          name: `Security Code Analysis`,
          description: ``,
          minimum_category_capability_level_id: 2,
          tools: `Security Code Analysis`,
          levels: [
            {
              level: 1,
              value: `Code has never been scanned with a web application security scanner`,
            },
            {
              level: 2,
              value: `Code has been previously scanned with a security scanner`,
            },
            {
              level: 3,
              value: `Code is regularly scanned with a security scanner`,
            },
            {
              level: 4,
              value: `Code is automatically scanned with a security scanner and defects are prioritized into active workload`,
            },
          ],
        },
        {
          name: `Automated Testing`,
          description: ``,
          minimum_category_capability_level_id: 3,
          tools: `Automated Testing`,
          levels: [
            {
              level: 1,
              value: `No defined acceptance tests`,
            },
            {
              level: 2,
              value: `Some existing acceptance tests, but little to no automation`,
            },
            {
              level: 3,
              value: `Most existing tests are automated, but all new acceptance tests are fully automated`,
            },
            {
              level: 4,
              value: `Acceptance tests are actively built and maintained with full automation for every build`,
            },
          ],
        },
        {
          name: `Continuous Integration`,
          description: ``,
          minimum_category_capability_level_id: 3,
          tools: `Continuous Integration`,
          levels: [
            {
              level: 1,
              value: `No automated build pipeline

Code is manually compiled and may not always compile successfully`,
            },
            {
              level: 2,
              value: `Build pipeline contains manual steps but the build is never left in a failed state

Some failures may be missed`,
            },
            {
              level: 3,
              value: `Build pipeline requires automated tests to pass before feature is considered complete`,
            },
            {
              level: 4,
              value: `Build pipeline requires automated tests to pass and failures are actively monitored and a process for handling failures is in place`,
            },
          ],
        },
        {
          name: `Performance Testing & Capacity Planning`,
          description: ``,
          minimum_category_capability_level_id: 3,
          tools: `Performance Testing & Capacity Planning`,
          levels: [
            {
              level: 1,
              value: `The operational capacity of the production software is not clearly understood`,
            },
            {
              level: 2,
              value: `Performance is manually tested during the release process using load scripts of common scenarios

Contributors understand the algorithmic complexity of the software`,
            },
            {
              level: 3,
              value: `Performance is automatically tracked in a staging environment to gauge changes in application performance

Contributors understand the optimal load that each instance can handle, and there is a process in place to make release decisions based on acceptance of new SLAs

Capacity provisioning and scaling up & down requires manual steps`,
            },
            {
              level: 4,
              value: `Performance is automatically tracked in both staging and production with a full understanding of the application performance characteristics. 

Contributors actively collaborate with the business to determine acceptance of new SLAs based on actual production traffic and predications created by load testing.

Capacity provisioning and scaling up & down is fully automated`,
            },
          ],
        },
        {
          name: `Configuration File Management`,
          description: ``,
          minimum_category_capability_level_id: 4,
          tools: `Configuration File Management`,
          levels: [
            {
              level: 1,
              value: `Manual configurations`,
            },
            {
              level: 2,
              value: `Each environment has predefined configurations`,
            },
            {
              level: 3,
              value: `Sensitive data has been abstracted, and configurations are human readable`,
            },
            {
              level: 4,
              value: `Sensitive data has been abstracted, and configurations are human readable

All configurations are automated with tools that support monitoring & alerting with minimal environment-specific data`,
            },
          ],
        },
        {
          name: `Service Consumer Tests`,
          description: ``,
          minimum_category_capability_level_id: 3,
          tools: `Service Consumer Tests`,
          levels: [
            {
              level: 1,
              value: `No or some tests simulating a consuming application or service`,
            },
            {
              level: 2,
              value: `Manual tests are executed to simulate a consuming application or service`,
            },
            {
              level: 3,
              value: `Automated tests of main use cases from a consuming application or service are integrated into the build pipeline`,
            },
            {
              level: 4,
              value: `Automated tests from a consuming application or service are triggered by the build pipeline, and cause the build to fail if there are errors`,
            },
          ],
        },
        {
          name: `There is a seperate environment where delopers can test their code from where non-developer testing happens`,
          description: ``,
          minimum_category_capability_level_id: 4,
          tools: `(nico) There is a seperate environment where delopers can test their code from where non-developer testing happens`,
          levels: [
            {
              level: 1,
              value: `Only pre`,
            },
            {
              level: 2,
              value: `Test Pre and Prod`,
            },
            {
              level: 3,
              value: `Dev Test Pre and Prod`,
            },
            {
              level: 4,
              value: `Local Dev Test Pre Prod`,
            },
          ],
        },
      ],
      description: '',
    },
    {
      name: 'Release',
      capabilities: [
        {
          name: `Deployment Strategy`,
          description: ``,
          minimum_category_capability_level_id: 3,
          tools: `Deployment Strategy`,
          levels: [
            {
              level: 1,
              value: `Contributors do not follow a documented or consistent deployment strategy`,
            },
            {
              level: 2,
              value: `Contributors follow a defined deployment strategy`,
            },
            {
              level: 3,
              value: `Contributors follow a defined deployment strategy that includes automated rollbacks, regression tests, configs, and tracking`,
            },
            {
              level: 4,
              value: `Contributors follow a defined deployment strategy that is fully automated and includes regression tests, configs, tracking, and database releases`,
            },
          ],
        },
        {
          name: `Build Pipeline Traceability`,
          description: ``,
          minimum_category_capability_level_id: 3,
          tools: `Build Pipeline Traceability`,
          levels: [
            {
              level: 1,
              value: `Code can be built correctly - manually or via a build pipeline`,
            },
            {
              level: 2,
              value: `There is a build pipeline with a visual representation and contributors are automatically alerted when a build fails`,
            },
            {
              level: 3,
              value: `Build is triggered by source control check-in or is scheduled, with alerts being sent out on failures`,
            },
            {
              level: 4,
              value: `Build is triggered by source control check-in or a build of its dependent services, with alerts being sent out on failures, and if successful the build is pushed across environments to production`,
            },
          ],
        },
        {
          name: `Continuous Delivery`,
          description: ``,
          minimum_category_capability_level_id: 3,
          tools: `Continuous Delivery`,
          levels: [
            {
              level: 1,
              value: `Manual deployment and testing are performed in staging`,
            },
            {
              level: 2,
              value: `Manual deployment, and automatic testing are performed in staging`,
            },
            {
              level: 3,
              value: `Automated deployment and tests are performed in staging`,
            },
            {
              level: 4,
              value: `Automated deployment and tests are performed in production when code is checked in as zero touch continuous deployments`,
            },
          ],
        },
        {
          name: `Dependency Management`,
          description: ``,
          minimum_category_capability_level_id: 3,
          tools: `Dependency Management`,
          levels: [
            {
              level: 1,
              value: `Dependencies are uncertain`,
            },
            {
              level: 2,
              value: `Manual dependency management`,
            },
            {
              level: 3,
              value: `Automatic dependency management`,
            },
            {
              level: 4,
              value: `Contributors follow a defined strategy to regularly update dependencies to newer versions`,
            },
          ],
        },
        {
          name: `Push Button Releases`,
          description: ``,
          minimum_category_capability_level_id: 3,
          tools: `Push Button Releases`,
          levels: [
            {
              level: 1,
              value: `Releases require more than one contributor to deploy`,
            },
            {
              level: 2,
              value: `Releases require manual intervention`,
            },
            {
              level: 3,
              value: `Code can be deployed via a push button release, but not the environment`,
            },
            {
              level: 4,
              value: `Production-like environments can be prepared through version controlled scripts and run via push button deployments`,
            },
          ],
        },
        {
          name: `Scriptable DB Releases`,
          description: ``,
          minimum_category_capability_level_id: 4,
          tools: `Scriptable DB Releases`,
          levels: [
            {
              level: 1,
              value: `Database specialist makes schema / migrations on behalf of the contributors`,
            },
            {
              level: 2,
              value: `Contributors create scripts to perform schema changes and migrations, but database specialist executes them`,
            },
            {
              level: 3,
              value: `DB schema changes and migrations are made directly from version control as a manual set during release`,
            },
            {
              level: 4,
              value: `DB schema changes and migrations and rollbacks are made directly from version control and consistent across all environments, including production`,
            },
          ],
        },
      ],
      description: '',
    },
    {
      name: 'Operate',
      capabilities: [
        {
          name: `DevOps Practice`,
          description: ``,
          minimum_category_capability_level_id: 4,
          tools: `DevOps Practice`,
          levels: [
            {
              level: 1,
              value: `Environments in production are not controlled by contributors building the product`,
            },
            {
              level: 2,
              value: `Environments in staging are controlled and partially managed by the contributors building the product and receive issues escalations for that environment`,
            },
            {
              level: 3,
              value: `Environments in production are owned by the contributors building the product, but controlled by someone else`,
            },
            {
              level: 4,
              value: `DevOps model is followed - environments in production are fully controlled and owned by the contributors building the product, including alerts and issue escalations`,
            },
          ],
        },
        {
          name: `OPS team in BU`,
          description: ``,
          minimum_category_capability_level_id: 4,
          tools: `OPS team in BU`,
          levels: [
            {
              level: 1,
              value: `Random developers looking at monitoring and acting on alerts`,
            },
            {
              level: 2,
              value: `Dedicate BU resident(local in country and not developer), fulfilling OPS responsability `,
            },
            {
              level: 3,
              value: `Identified OPS team (3+) in BU understanding the BU context. Still operating under I&O process and procedures`,
            },
            {
              level: 4,
              value: `Identified OPS team (3+) in BU having business contect outside their BU`,
            },
          ],
        },
        {
          name: `Monitoring & Alerting`,
          description: ``,
          minimum_category_capability_level_id: 3,
          tools: `Monitoring & Alerting`,
          levels: [
            {
              level: 1,
              value: `Basic monitoring and alerting setup by I&O inherited by BU. Business monitoring setup by BU and not shared with I&O.`,
            },
            {
              level: 2,
              value: `Consolidated monitoring and alerting platform. Monitoring shared between BU's and I&O.`,
            },
            {
              level: 3,
              value: `80% monitoring coverage and understanding alerts and action required. SLA's devined and resident OPS (in BU) able to act (24/7) on alerts `,
            },
            {
              level: 4,
              value: `100% monitoring coverage and understanding alerts and action required. SLA's devined and resident OPS (in BU) able to act (24/7) on alerts`,
            },
          ],
        },
        {
          name: `On-Call Strategy`,
          description: ``,
          minimum_category_capability_level_id: 3,
          tools: `On-Call Strategy`,
          levels: [
            {
              level: 1,
              value: `I&O on call for BU `,
            },
            {
              level: 2,
              value: `BU identified individual (Dev and Ops) on call for specific functionality`,
            },
            {
              level: 3,
              value: `BU OPS and Dev team on call for all BU capabilities`,
            },
            {
              level: 4,
              value: `24/7 OPS team enabled with automated scripts and processes to recover systems. BU and Ops on-call process to follow when outside automated scope`,
            },
          ],
        },
        {
          name: `DR`,
          description: ``,
          minimum_category_capability_level_id: 3,
          tools: `DR`,
          levels: [
            {
              level: 1,
              value: `Contributors do not fully own risk management or mitigation of the product. Disaster recovery is normally defined and/or managed by someone else who has full ownership`,
            },
            {
              level: 2,
              value: `Contributors think about disaster recovery plans while the code is built and released, but requires the involvement from many other parties`,
            },
            {
              level: 3,
              value: `There is an established disaster recovery plan (DRP) and business able to recover systems from playbooks`,
            },
            {
              level: 4,
              value: `There is an established disaster recovery plan (DRP) and business continuity program (BCP) which has been tested within the past 6 months`,
            },
          ],
        },
        {
          name: `Log Management Strategy`,
          description: ``,
          minimum_category_capability_level_id: 3,
          tools: `Log Management Strategy`,
          levels: [
            {
              level: 1,
              value: `Normal logging`,
            },
            {
              level: 2,
              value: `Log files are kept clean and synced to ELK`,
            },
            {
              level: 3,
              value: `ELK is used for all log files and monitoring and alerting are configured`,
            },
            {
              level: 4,
              value: `Automated logging to ELK are enabled and all developers in the BU are enabled and capable`,
            },
          ],
        },
      ],
      description: '',
    },
    {
      name: 'Optimize',
      capabilities: [
        {
          name: `Continuous Process Improvement`,
          description: ``,
          minimum_category_capability_level_id: 3,
          tools: `Continuous Process Improvement`,
          levels: [
            {
              level: 1,
              value: `Few processes are defined and contributors rely on tribal knowledge to succeed`,
            },
            {
              level: 2,
              value: `Processes are documented and can be repeated by any contributor`,
            },
            {
              level: 3,
              value: `Contributors simplify / automate processes whenever possible and documentation is maintained by as they evolve`,
            },
            {
              level: 4,
              value: `Contributors are actively focused on continuous process improvement by identifying and enhancing processes; performance is predictable, and quality is consistently high`,
            },
          ],
        },
        {
          name: `Tech Debt Management`,
          description: ``,
          minimum_category_capability_level_id: 2,
          tools: `Tech Debt Management`,
          levels: [
            {
              level: 1,
              value: `Contributors do not track debt in any consistent way`,
            },
            {
              level: 2,
              value: `Contributors can track debt via a defined process (Roadmap)`,
            },
            {
              level: 3,
              value: `Contributors avoid taking on any new debt by actively tracking and managing it`,
            },
            {
              level: 4,
              value: `Contributors actively prioritize and reduce all debt`,
            },
          ],
        },
        {
          name: `Root Cause Prevention`,
          description: ``,
          minimum_category_capability_level_id: 2,
          tools: `Root Cause Prevention`,
          levels: [
            {
              level: 1,
              value: `Production issues happen and sometimes it's known why, but it is mostly difficult to find the underlying cause`,
            },
            {
              level: 2,
              value: `Contributors follow a defined process for determining the root cause of issues`,
            },
            {
              level: 3,
              value: `Contributors follow a defined and accepted process for determining the root cause of issues, and major issues are prioritized and corrected`,
            },
            {
              level: 4,
              value: `Contributors follow a defined and accepted process for root cause analysis which includes consistently preventing future issues by: 
1) putting the issue into the work queue 
2) prioritizing and correcting the issue, and 
3) adding monitoring / alerting to detect such issues`,
            },
          ],
        },
        {
          name: `Data-Driven Metrics`,
          description: ``,
          minimum_category_capability_level_id: 3,
          tools: `Data-Driven Metrics`,
          levels: [
            {
              level: 1,
              value: `It takes a lot of time to gather metrics and sometimes it's too late to get the data after the fact`,
            },
            {
              level: 2,
              value: `Metrics can be pulled after an issue happens to determine why`,
            },
            {
              level: 3,
              value: `Metrics illustrate the product health, and action (e.g. product decisions) is taken based on the metrics`,
            },
            {
              level: 4,
              value: `Metrics illustrate the product health, predictive rules create alerts, and action (e.g. product decisions) is taken based on the metrics`,
            },
          ],
        },
      ],
      description: '',
    },
  ],
};
