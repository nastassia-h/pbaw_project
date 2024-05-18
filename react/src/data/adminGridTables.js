export const userGridData = {
   title: 'Users',
   filters: {
    email: "",
    location: "",
    occupation: "",
   },
   headCells: [
      {
        id: 'id',
        numeric: true,
        disablePadding: true,
        label: 'ID',
        mapping: ['id'],
      },
      {
        id: 'fullname',
        numeric: false,
        disablePadding: false,
        label: 'Fullname',
        mapping: [
         'first_name',
         'last_name'
        ],
      },
      {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
        mapping: ['email'],
      },
      {
        id: 'location',
        numeric: false,
        disablePadding: false,
        label: 'Location',
        mapping: ['location'],
      },
      {
        id: 'occupation',
        numeric: false,
        disablePadding: false,
        label: 'Occupation',
        mapping: ['occupation'],
      },
    ]
 }

 export const postGridData = {
   title: 'Posts',
   filters: {
    description: "",
   },
   headCells: [
      {
        id: 'id',
        numeric: true,
        disablePadding: true,
        label: 'ID',
        mapping: ['id'],
      },
      {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'Description',
        mapping: [
         'description',
        ],
      },
      {
        id: 'created_at',
        numeric: false,
        disablePadding: false,
        label: 'Created At',
        mapping: [
         'created_at',
        ],
      },
    ]
 }

 export const commentGridData = {
  title: 'Comments',
  filters: {
    comment: ""
  },
  headCells: [
     {
       id: 'id',
       numeric: true,
       disablePadding: true,
       label: 'ID',
       mapping: ['id'],
     },
     {
      id: 'user_id',
      numeric: true,
      disablePadding: true,
      label: 'User ID',
      mapping: ['user_id'],
    },
     {
       id: 'comment',
       numeric: false,
       disablePadding: false,
       label: 'Comment',
       mapping: [
        'comment',
       ],
     },
   ]
}