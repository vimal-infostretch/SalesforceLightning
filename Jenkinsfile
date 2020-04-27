#!groovy

import groovy.json.JsonSlurperClassic


node {
    
 
    def SF_CONSUMER_KEY=env.SF_CONSUMER_KEY_INF
    def SF_USERNAME=env.SF_USERNAME_INF
    def SERVER_KEY_CREDENTALS_ID=env.SERVER_KEY_CREDENTALS_ID_INF
    def TEST_LEVEL='RunLocalTests'
    def PACKAGE_NAME='0Ho2x000000fxSVCAY'
    
    def PACKAGE_VERSION


    def toolbelt = tool 'toolbelt'
	def pmdtool = tool 'pmd'
    
     // sfdx auth url for sandbox
	 //-------------------------------
	 // "sfdxAuthUrl": "force://PlatformCLI::5Aep861HX_9oVgz0v9EcFLPysJL3rXeZ6bUjW_7BJRvvIOqt8ndawvnDqzQw73yyI.1cl60TrJMKjz_Q8fc1WwK@infostretch--sfdcdevops.my.salesforce.com"
    

	// sfdx auth url for feature branch
	//--------------------------------------
	//  "sfdxAuthUrl": "force://PlatformCLI::5Aep861Xq7VoDavIt66EpjfVPKZ7zXY79kzRm0HUxeyTdZL3b_XvLf2eA9xipgc5V8BwAKQZB.qQRgjbSNDhaGu@ap17.salesforce.com"

    // -------------------------------------------------------------------------
    // Check out code from source control.
    // -------------------------------------------------------------------------

    stage('checkout source') {
       
        checkout scm 
       
    }


    // -------------------------------------------------------------------------
    // Run all the enclosed stages with access to the Salesforce
    // JWT key credentials.
    // -------------------------------------------------------------------------

    withCredentials([file(credentialsId: SERVER_KEY_CREDENTALS_ID, variable: 'server_key_file')]) {

        // -------------------------------------------------------------------------
        // Authorize the Dev Hub org with JWT key and give it an alias.
        // -------------------------------------------------------------------------
  stage('Authorize Org') {
           rc = command "${toolbelt}\\sfdx force:auth:jwt:grant --clientid \"${SF_CONSUMER_KEY}\" --username \"${SF_USERNAME}\" --jwtkeyfile \"${server_key_file}\" --instanceurl \"https://test.salesforce.com\" --setdefaultdevhubusername --setalias SFDC_INF_Org"
            if (rc != 0) {
                error 'Salesforce dev hub org authorization failed.'
            }
        }       
	    stage('Static Code Analysis') {
		    
		    try
		    {
	    //echo 'Doing Code Review for Apex '
		  if (isUnix()) {
			  output = sh returnStdout: false, script: "${pmdtool}\\pmd -d force-app/main/default/classes -f html -R ApexRule.xml -failOnViolation false -reportfile CodeReviewAnalysisOutput.html"
		  } else {
		   //bat(returnStdout: true, script: "${toolbelt}\\sfdx force:package:version:create --package ${PACKAGE_NAME} --installationkeybypass --wait 10 --json --targetdevhubusername DevHub").trim()
 
		      	    output = bat(returnStdout: false, script: "${pmdtool}\\pmd -d force-app/main/default/classes -f html -R ApexRule.xml -failOnViolation false -reportfile CodeReviewAnalysisOutput.html").trim()

			}
		  }
		catch(err)
            {
                
            }
	    }
	    
	    //---------------------------------------------------------------------
	    // Convert source to Metadata format for deployment
	    //---------------------------------------------------------------------
	    stage('Convert source to Metadata')
	    {
		    

		   
			    rc = command "${toolbelt}\\sfdx force:source:convert -r force-app -d mdapioutput -n 'metatdataPackage'"
			    
			     if (rc != 0) {
                		error 'Conversion from Source to Metatdata Failed!'
            			}
		    
	    }
	    stage('Authorize Sandbox Org') {
          
            echo "Authenticate Sandbox Org to install package to"
            rc = command "${toolbelt}\\sfdx force:auth:sfdxurl:store -f package-sfdx-project.json -s -a SFDC_INF_Org"
            //rc = command "${toolbelt}\\sfdx force:org:create --targetdevhubusername DevHub --setdefaultusername --definitionfile config/project-scratch-def.json --setalias installorg --wait 10 --durationdays 1"
            if (rc != 0) {
                error 'Authorization to Salesforce failed.'
            }
		    
           
        }
	    stage('Deploy to Sandbox'){
		
		    rc = command "${toolbelt}\\sfdx force:mdapi:deploy -d mdapioutput/ -u SFDC_INF_Org -w 100"
            //rc = command "${toolbelt}\\sfdx force:org:create --targetdevhubusername DevHub --setdefaultusername --definitionfile config/project-scratch-def.json --setalias installorg --wait 10 --durationdays 1"
            if (rc != 0) {
                error 'Deployment of application failed.'
            	}
		    else
		    {
			    
			    echo 'Displaying Sandbox Org Information'
			    rc = command "${toolbelt}\\sfdx force:org:display -u SFDC_INF_Org"
			    if(rc!=0){
				    error 'Error in showing Sandbox Org information.'
			    }
		    }
		    
	    }
       /*
       
	stage('Production Deployment Approval'){
    		input 'Do you want to deploy package to Production?'
		}
	stage('Authorize Production'){
		echo "Authenticate Production Org to deploy to"
		rc = command "${toolbelt}\\sfdx force:auth:sfdxurl:store -f package-sfdx-project.json -s -a ProdOrg"
		 if (rc != 0) {
                	error 'Authorization to Production failed.'
            		}
    		}
    	stage('Deploy to Production'){
    rc = command "${toolbelt}\\sfdx force:mdapi:deploy -d mdapioutput/ -u ProdOrg -w 100"
        //	rc = command "${toolbelt}\\sfdx force:package:install --targetusername ProdOrg --package ${PACKAGE_VERSION} --wait 10 --publishwait 10 --noprompt --json"
        		if (rc != 0) {
                		error 'Salesforce package install failed.'
            			}
    		}
	    */
        }    

    
    
}



def command(script) {
    if (isUnix()) {
        return sh(returnStatus: true, script: script);
    } else {
        return bat(returnStatus: true, script: script);
    }
}
