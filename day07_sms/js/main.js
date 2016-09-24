/**
 * Created by zhoubinbin on 2016/9/21.
 * 创建核心模块，核心模块依赖其他下级模块，需要注入学生模块，教师模块...
 */
//注入ngRoute路由
var app = angular.module("app",["ngRoute","app.stuModule","app.teaModule"]);
//核心控制器
app.controller("mainCtrl",function ($scope) {
    $scope.msg = "hello";
    //测试
    //console.log($scope.msg);
});
//配置阶段，配置路由，回调函数中需要注入$routeProvider，类似于过滤器
app.config(function ($routeProvider) {
    $routeProvider.when("/Student",{
        templateUrl:"tpl/stu.html",
        controller:"StudentController"
    }).when("/Teacher",{
        templateUrl:"tpl/tea.html",
        controller:"TeacherController"
    });
});

