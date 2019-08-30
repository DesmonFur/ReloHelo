module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    console.log(req.body);
    const newUser = await db.create_account([username, password]);
    req.session.user = newUser
    console.log(req.session)

    res.status(201).send(newUser);
  },
  login: async (req, res) => {
    const db = req.app.get("db");
    const { username, password, id } = req.body;
    const user = await db.find_user([username, password]);
    req.session.user = user[0]
    res.status(200).send(user);
    console.log(req.session);
  },
  getPosts: async (req, res) => {
    const db = req.app.get("db");
    const { title } = req.query;
    console.log("query", req.query);
    const posts = await db.get_all_posts([]);
    res.status(200).send(posts);
  },
  getUserPosts: async (req, res) => {
    const db = req.app.get("db");
    const { title, myPosts } = req.query;
    const { userid } = req.params;
    console.log("query", req.query);

    if (title !== "" && myPosts === "true") {
      console.log(title);
      const posts = await db.find_post_by_title([`%${title}%`]);
      res.status(200).send(posts);
    } else if (title === "" && myPosts === "false") {
      const posts = await db.non_user_posts([userid]);
      res.status(200).send(posts);
    } else if (title !== "" && myPosts === "false") {
      console.log("hit 3");
      const posts = await db.non_user_search_posts([userid, `%${title}%`]);
      res.status(200).send(posts);
    } else {
      const posts = await db.get_all_posts();
      res.status(200).send(posts);
    }
  },
  getOnePost: async (req, res) => {
    const db = req.app.get("db");
    const {postid} = req.params
    
    const posts = await db.get_one_post([postid])
    res.status(200).send(posts)
  },
  post: async(req,res) => {
    const db = req.app.get('db')
    const {userid} = req.session.user.id
    console.log('params',userid)
    console.log('sessions',req.session.user.id)
    const {img,title,content} = req.body
    const posts = await db.create_post([title,img,content,userid])
    res.status(200).send(posts)
  },
    getSession: (req, res) => {
    if (req.session) {
      res.status(200).send(req.session);
    } 
  },
  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send({ message: "Logged out" });
  }
};
