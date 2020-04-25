$(document).ready(function(){
    $("#submit").click(function(e){
            e.preventDefault();
            const prof = $("#user").val();
            $.ajax('https://api.github.com/users/'+prof , {
                type: 'GET' ,
            }).done(function(res){
                $("#user_profile").html(`<div class="container bg-dark">
                <div class="row">
                  <div class= "col-sm-4">
                       <div class="well" id="profile_img"></div>   
                  </div> 
                  <div class="col-sm-8 details">
                       <div class="well" id="about">
                          <div class="display-4 font-weight-bold" id="name">
                          </div>
                          <div class="row border-bottom border-secondary">
                            <div class="col-sm-5" id="followers">Followers : </div>
                            <div class="col-sm-5" id="following">Followings : </div>
                       </div>
                       <div class="row border-bottom border-secondary">
                            <div class="col-sm-5" id="repo">Repo : </div>
                            <div class="col-sm-5" id="gist">Gist : </div>
                       </div>
                       <div class="row border-bottom border-secondary">
                            <div class="col-sm-5" id="blog">Blog : </div>
                            <div class="col-sm-5" id="mail">Location : </div>
                       </div>
                       <div class="row">
                       <div class="col-sm-10" id="bio">Bio : </div>
                  </div>
                 </div>
                </div>
                <div>
                </div>

                <div class = "container">
                <h2>Latest repo : </h2>
             </div>
                <div id="repos"></div>
                
              </div>`);
              $("#profile_img").append(`<img class="img-fluid thumbnail avatar" src="${res.avatar_url}">
              <a target="_blank" class="btn btn-primary btn-block profile_btn" href="${res.html_url}">View Profile</a>`);
               $("#name").append(res.name);

               $("#followers").append(res.followers); 
                $("#following").append(res.following);

                $("#repo").append(res.public_repos);
                $("#gist").append(res.public_gists);
                $("#blog").append(` <a href="${res.blog}" >${res.blog}</a>`);
                $("#bio").append(res.bio);
                $("#mail").append(res.location);
                $(".row").css({
                     "padding":"2vh",
                     
                });
                var username=res.login;
                var len=res.public_repos;
                if(len<10)
                len=len;
                else
                len=10;
                $.ajax({
                    url:'https://api.github.com/users/'+username+'/repos'
                }).done(function(repos){
                            for(let i = len-1; i>0;i-=2){
                            $('#repos').append(`
                           
                            <div class="row" style="min-height:150px; display:flex;">
                                 <div class="offset-sm-1  col-sm-4 bg-light text-dark  mb-4" style="min-height:150px;"> <strong style="color:rgb(36, 148, 61);">${repos[i-1].name}</strong>: ${repos[i-1].description}
                                 <div class="row" style="position:absolute; bottom:0">
                                         <div class="col-xs-3 badge repos[i]-badge">Forks: ${repos[i-1].forks_count}</div>
                                          <div class="col-xs-3 badge repos[i]-badge">Watchers: ${repos[i-1].watchers_count}</div>
                                          <div class="col-xs-3 badge repos[i]-badge">Stars: ${repos[i-1].stargazers_count}</div>
                                     </div>
                                 </div>
                                
                                <div class="offset-sm-1 col-sm-4 offset-sm-2 bg-light text-dark mb-4" style="min-height:150px;"><strong style="color:rgb(36, 148, 61);">${repos[i].name}</strong>: ${repos[i].description}
                                <div class="row" style="position:absolute; bottom:0">
                                    <div class="col-xs-3 badge repos[i]-badge">Forks: ${repos[i].forks_count}</div>
                                    <div class="col-xs-3 badge repos[i]-badge">Watchers: ${repos[i].watchers_count}</div>
                                    <div class="col-xs-3 badge repos[i]-badge">Stars: ${repos[i].stargazers_count}</div>
                                    
                                </div>
                                </div>
                           </div>
                           
                            `);
                            
                       }
                     }).fail(function() {
                        $("#repos").html("Enter loading repos");
                      });
                 $(".details a").css({
                    "text-decoration": "none",
                    "color":"#588BAE"
                });
                /*$(".row-eq-height").css({
                    "min-height": "1000px"
                });*/
               $(".btn-primary").css({"border":"none",
               "background-color": "rgb(36, 148, 61)" ,
                "background-image": "linear-gradient(-180deg, rgb(34, 147, 60), rgb(36, 148, 61) 90%)"});
               
            }).fail(function() {
                $("#user_profile").html("Enter a valid username");
            });
            
                });
    $("#user").keypress(function(e){
        if(e.which == 13){
            $("#submit").click();
        }
    });

});
