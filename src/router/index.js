import Vue from 'vue'
import VueRouter from 'vue-router'
import BookRack from '../views/BookRack.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/bookrack',
    name:"BookRack",
    component:BookRack
  },
  {
    path:'/',
    name:"BookCity",
    component:()=>import('../views/bookcity/BookCity.vue'),
    children:[
      {
        path:'female',
        name:'Female',
        props:true,
        component:()=>import('../views/bookcity/Female.vue'),
        
      },
      {
        path:'male',
        name:'Male',
        props:true,
        component:()=>import('../views/bookcity/Male.vue'),
      },
      {
        path:'synthesize',
        name:'Synthesize',
        props:true,
        component:()=>import('../views/bookcity/Synthesize.vue'),
      },
      {
        path:'else',
        name:'Else',
        props:true,
        component:()=>import('../views/bookcity/Else.vue'),
      },
      {
        path:'classbook/:classname/:title',
        name:'ClassBook',
        props:true,
        component:()=>import('../views/bookcity/classbook/ClassBook.vue'),
        children:[
          {
            path:'booksingle/:id',
            name:'BookSingle',
            props:true,
            component:()=>import('../views/bookcity/classbook/BookSingle.vue'),
            children:[
              {
                path:'directory/:bookid/:title',
                name:'Directory',
                props:true,
                component:()=>import('../views/bookcity/classbook/directory/Directory.vue'),
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path:'/discover',
    name:"Discover",
    component:()=>import('../views/Discover.vue')
  },
  {
    path:'/community',
    name:"Community",
    component:()=>import('../views/community/Community.vue'),
    children:[
      {
        path:'commentdetails/:post/:restday',
        name:"CommentDetails",
        props:true,
        component:()=>import('../views/community/CommentDetails.vue'),
      }
    ]
  },
  {
    path:'/mine',
    name:"Mine",
    component:()=>import('../views/mine/Mine.vue'),
    props:true,
    children:[
      {
        path:'booksingle/:id',
        name:'BookSinglem',
        props:true,
        component:()=>import('../views/bookcity/classbook/BookSingle.vue'),
        children:[
          {
            path:'directorym/:bookid/:title',
            name:'Directorym',
            props:true,
            component:()=>import('../views/bookcity/classbook/directory/Directory.vue'),
          }
        ]
      }
    ]
    
  },
  {
    path:'/login',
    name:"Login",
    component:()=>import('../views/Login.vue')
  },
  {
    path:'/searchcontent/:bookname',
    name:"SearchContent",
    props:true,
    component:()=>import('../views/SearchContent.vue'),
    children:[
      {
        path:'booksingle/:id',
        name:'BookSingles',
        props:true,
        component:()=>import('../views/bookcity/classbook/BookSingle.vue'),
        children:[
          {
            path:'directorys/:bookid/:title',
            name:'Directorys',
            props:true,
            component:()=>import('../views/bookcity/classbook/directory/Directory.vue'),
          }
        ]
      }
    ]
  },

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass:'active'
})


export default router
