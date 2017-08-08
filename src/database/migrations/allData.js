export default {
  asset_types: [
    {
      id: '0c094131-19a0-40ad-bb4c-cbc79d12fdbb',
      name: 'Product',
    },
    {
      id: 'b60fb6ad-f89b-4c97-a547-201ff6555e01',
      name: 'Component',
    },
    {
      id: '5b2cf031-2344-4ffd-8768-863594ac302d',
      name: 'Business Unit',
    },
  ],
  categories: [
    {
      id: '0e600afd-4dfe-497c-bf00-e554dfb38a45',
      name: 'Code',
      description: '',
      capabilities: [
        {
          id: '8663a293-0cf2-4619-ace6-44659db3e0ac',
          name: 'Code Management Strategy',
          description: '',
          minimum_category_capability_level_id: 1,
          levels: [
            {
              id: '0eb2157a-b14e-4863-a57e-fd3330b7d75b',
              level: 1,
              value: 'Code is in SCM (e.g. git) and used for release, but there is little to no documented or agreed strategy of how to branch, merge, or release code',
            },
            {
              id: '78aae421-6a92-4eb7-878a-cacee7106d6f',
              level: 2,
              value: 'Develop on version branches. Every deployment can be tracked back to understand all changes which went into it by anyone in the team',
            },
            {
              id: '31778e3d-6a42-4a85-95f8-754f4179cb7c',
              level: 3,
              value: 'Develop on feature branches that are short-lived (i.e. less than two weeks) and release from merged master',
            },
            {
              id: 'e760fc1c-43c3-4596-8aff-5836a5f82d6c',
              level: 4,
              value: 'Develop and release from master with at least daily code check-ins',
            },
          ],
        },
        {
          id: '57ce1780-cb80-4d03-a902-7d793dba50c1',
          name: 'Logging & Telemetry',
          description: '',
          minimum_category_capability_level_id: 1,
        },
      ],
    },
    {
      id: '17388c8d-ebfb-4436-b771-8f9bf544a6bf',
      name: 'Build & Test',
      description: '',
    },
    {
      id: '7a06d253-dc25-445d-94f4-948e95a8b50b',
      name: 'Release',
      description: '',
    },
    {
      id: 'c2e65310-a034-49dc-a027-2b1c6aabdf87',
      name: 'Operate',
      description: '',
    },
    {
      id: '3e707c02-d6e6-4fc1-83b2-4514b7fb31d8',
      name: 'Optimize',
      description: '',
    },
  ],
};
