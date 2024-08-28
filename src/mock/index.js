import Mock from "mockjs";

let data_success = {
  status: "ok",
};

let data_error = {
  status: "error",
};

let register_success = {
  status: "success",
  message: "用户注册成功",
};

let register_error = {
  status: "error",
  message: "用户名已存在",
};

Mock.mock("/api/login", "post", (req) => {
  console.log(req);
  let req_data = JSON.parse(req.body);
  if (req_data.username == "admin" && req_data.password == "123456") {
    return data_success;
  }
  return data_error;
});

Mock.mock("/api/register", "post", (req) => {
  console.log(req);
  let req_data = JSON.parse(req.body);
  const usernames = ["admin", "user1", "user2"]; // 假设的已存在用户名列表
  if (usernames.includes(req_data.username)) {
    return register_error;
  } else {
    // 在实际应用中，这里应该将新用户信息保存到数据库
    return register_success;
  }
});

export default Mock;
