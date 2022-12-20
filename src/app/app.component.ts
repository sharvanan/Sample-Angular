		import { Component, OnChanges, OnInit } from '@angular/core';
		import { KeycloakService } from 'keycloak-angular';
		import { KeycloakProfile, KeycloakRoles } from 'keycloak-js';

		@Component({
		  selector: 'app-root',
		  templateUrl: './app.component.html',
		  styleUrls: ['./app.component.css']
		})
		export class AppComponent implements OnInit, OnChanges {

		  public isLogin = false;
		  public profileUser: KeycloakProfile | null = null;
		  public accessToken:String = "";
		  public idToken:String = "";

		  constructor(private readonly keycloak: KeycloakService) {}

		  public async ngOnInit() {

		    this.isLogin = await this.keycloak.isLoggedIn();

		    type rolesUsuarios = Array<{id: number, text: string}>;
			
		    if (this.isLogin) {
		      this.profileUser = await this.keycloak.loadUserProfile();
			  this.accessToken = await this.keycloak.getToken();
			  this.idToken = await this.keycloak.getKeycloakInstance().idToken as String;
			  console.log("ID Token"+ this.idToken)
		    }
		  }

		  public async ngOnChanges(){
			if (this.isLogin) {
				console.log('test')
				this.profileUser = await this.keycloak.loadUserProfile();
				
			  }
		  }

		  public async initSesion() {
			console.log('init login')
		    await this.keycloak.login();
			this.isLogin = await this.keycloak.isLoggedIn();
			if (this.isLogin) {
				console.log(this.keycloak.getToken())
				this.profileUser = await this.keycloak.loadUserProfile();
			  }
		  }

		  public clearSesion() {
		    //this.keycloak.logout();
			window.location.replace("http://localhost:8080/auth/realms/demo/protocol/openid-connect/logout?post_logout_redirect_uri=http://localhost:4200/&id_token_hint="+this.idToken)
		  }

		  public getuserInfo(){
			//Calling API
			fetch('http://127.0.0.1:8080/auth/realms/demo/protocol/openid-connect/userinfo', 
			{headers:{"Authorization":`Bearer ${this.accessToken}` }}).then((res:Response)=>res.json())
			.then((resp:Response)=>
			{console.log(resp)})
		  }
		}
