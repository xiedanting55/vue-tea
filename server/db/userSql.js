//验证数据库中的用户相关内容
const User = {
  //查询用户手机号
  queryUserTel (option) {
    return `select * from user where tel = ${option.userTel}`
  },
  queryUserPwd (option) {
    return `select * from user where (tel = '${option.userTel}') and pwd = '${option.userPwd}'`
  },
  //新增用户
	inserData( option ){
		let userPwd = option.userPwd  || '666666';
		return `insert into user (tel,pwd,imgUrl,nickName,token) values ("${option.userTel}",${userPwd},"1.jpg","1","2")`;
	}
}
exports = module.exports = User; 
// 验证数据库中的用户相关内容