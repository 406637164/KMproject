-- create dbs
CREATE DATABASE todos;

-- create table
-- CREATE TABLE `collector` (
--      `id` int(20) NOT NULL AUTO_INCREMENT,
--      `collector` varchar(20) NOT NULL  UNIQUE, 
--      `sampleid` int(9) NOT NULL
--      PRIMARY KEY (`id`)
--      FOREIGN KEY (`sampleid`) REFERENCES Sample(`sampleid`)
--      ON DELETE CASCADE
-- ) ;
CREATE TABLE `樣本` (
     `編號` int(20) NOT NULL AUTO_INCREMENT ,
     `樣本編號` int(20) NOT NULL ,   
     `用戶` TINYTEXT(20) NOT NULL ,  
     `樣本名稱` TINYTEXT(20) NOT NULL ,  
     `樣本觀察時間` DATETIME NOT NULL ,  
     `經度` DOUBLE NOT NULL ,  
     `緯度` DOUBLE NOT NULL ,  
      PRIMARY KEY (`編號`,`樣本編號`) UNIQUE,
) ;

//problem table有 improve problem sampleid對應到sampleid 所有的5個problem對應到sampleid

CREATE TABLE `樣本問題`(
     `樣本編號` int(20) NOT NULL,
     `樣本問題編號` int(20) NOT NULL AUTO_INCREMENT,
     `視覺觀察問題(短)` TINYTEXT(50)  NOT NULL,
     `視覺觀察問題(長)` LONGTEXT(500)  NOT NULL,
     `視覺觀察改善建議(短)` TINYTEXT(50)  NOT NULL,
     `視覺觀察問題改善建議(長)` LONGTEXT(500)  NOT NULL,
     `照片問題(短)` TINYTEXT(50)  NOT NULL,
     `照片問題(長)` LONGTEXT(500)  NOT NULL,
     `照片改善建議(短)` TINYTEXT(50)  NOT NULL,
     `照片改善建議(長)` LONGTEXT(500)  NOT NULL,
     `DNA問題(短)` TINYTEXT(50)  NOT NULL,
     `DNA問題(長)` LONGTEXT(500)  NOT NULL,
     `DNA改善建議(短)` TINYTEXT(50)  NOT NULL,
     `DNA改善建議(長)` LONGTEXT(500)  NOT NULL,
      PRIMARY KEY (`樣本問題編號`) UNIQUE,
      FOREIGN KEY (`樣本編號`) REFERENCES 樣本(`樣本編號`)
) ;
 
`DNA_problem_L`,`DNA_improve`,`Photo_problem_S`,`Photo_problem_L`,`Photo_improve`) VALUES 
(1, "102356499","too bad","xxx is to moisure","more water","too bad","xxx is to moisure","more water",,"too bad","xxx is to moisure","more water");
//get 傳入參數api:id
//SELECT * FROM collector NATURAL JOIN Sample GROUP BY id,collector 
//這樣就可以找到一個collector的每個sample的problem問題 
//每一個row都會有採集者表單輸入的sample問題,還有sampleid
//但一個採集者可能又會採集好幾個sample
//用SELECT的結果找出一個人的所有id
//去找一個人的105593309,108630796,109373865
//https://api.inaturalist.org/v1/observations/105593309,108630796,109373865
//和select結果合併起來
//原本其他collector的data https://api.inaturalist.org/v1/observations/105593309,108630796,109373865
//變成假設api/1 api/2 ,api/3 ,api/4,api/5 等等 小的
//大的 api/自己的id
//所以我在想要不要一開始進去要不要給他輸入ID才有辦法把大的給顯示出來
//或是有比較好的方式把自己的給排除掉?small可以用來顯示其他人的