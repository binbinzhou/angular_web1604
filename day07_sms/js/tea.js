/**
 * Created by zhoubinbin on 2016/9/21.
 * 创建教师信息模块
 */
angular.module("app.teaModule",[])
    .controller("TeacherController",function ($scope,TeacherService) {
        $scope.name = "教师信息管理";
        TeacherService.getAllTeacher(function (data) {
           $scope.teachers = data;
        });
    })
    /*
     //利用factory简单方法一
    .factory("TeacherService",function ($http) {
        return {
            getAllTeacher:function (handler) {
                $http.get("data/teachers.json").success(function (data) {
                   handler(data);
                });
            }
        };
    });*/
    .provider("TeacherService",function () {
        this.url = "";
        this.setUrl = function(url){
            this.url = url;
        };
        this.$get = function ($http) {
            var self= this;
            return {
                getAllTeacher:function (handler) {
                    $http.get(self.url).success(function (data) {
                       handler(data);
                    });
                }
            };
        };
    })
    .config(function (TeacherServiceProvider) {
        TeacherServiceProvider.setUrl("data/teachers.json");
    });