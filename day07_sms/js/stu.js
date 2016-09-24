/**
 * Created by zhoubinbin on 2016/9/21.
 * 学生信息模块
 */
//创建学生信息模块
angular.module("app.stuModule",["ngRoute"])
    //获取全部学生信息控制器
    .controller("StudentController",function ($scope,StudentService,$location) {      //将需要的服务注入控制器中
        $scope.name = "学生信息管理";
        $scope.stus = {
            gender:"male"
        };
        //在控制器中调用获取写在服务中获取所有学生信息的方法，并将获取到的data绑定在$scope.students上，之后再遍历
        StudentService.getAllStudents(function (data) {
            $scope.students = data;
        });
        $scope.add = function () {
          $location.path("/addStudent");
        };
    })
    //添加学生控制器
    .controller("StudentAddController",function ($scope,StudentService) {
        $scope.name = "学生信息添加";
        $scope.stu = {};
        $scope.saveStudent = function () {
            console.log($scope.stu);
            //StudentService.addStudent($scope.stu);
        }
    })
    //创建提供器服务模式，比factory  service较为复杂，但功能更加强大
    .provider("StudentService",function () {
        this.url = "";
        this.setUrl = function (url) {
            this.url = url ;
        };
        this.$get = function ($http) {
            var self = this;
            //用self来中转this值
            return {
                getAllStudents:function (handler) {
                    $http.get(self.url).success(function (data) {
                        handler(data);
                    });
                },
                addStudent:function (stu) {
                    //$http.post方法提交时候会有一个参数，把收集的数据保存到对象里面
                    $http.post("addStudent.action",stu).success(function () {
                        alert("保存成功！");
                    });
                }
            };
        }
    })
    //需要配置provider  在配置阶段运行！！
    .config(function (StudentServiceProvider,$routeProvider) {
        //调用设置url方法，程序做活了，后期可扩展性强
        StudentServiceProvider.setUrl("data/students.json");
        //再次利用路由机制，点击添加按钮跳转到添加页面，这里也需要在.config的回调函数中注入$routeProvider
        $routeProvider.when("/addStudent",{
            templateUrl:"tpl/stu_add.html",
            controller:"StudentAddController"
        })
    });

