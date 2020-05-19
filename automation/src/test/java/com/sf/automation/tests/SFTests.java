package com.sf.automation.tests;

import static com.qmetry.qaf.automation.step.CommonStep.click;
import static com.qmetry.qaf.automation.step.CommonStep.get;
import static com.qmetry.qaf.automation.step.CommonStep.sendKeys;
import static com.qmetry.qaf.automation.step.CommonStep.verifyPresent;
import static com.qmetry.qaf.automation.step.CommonStep.verifyText;
import static com.qmetry.qaf.automation.step.client.RuntimeScenarioFactory.scenario;

import org.testng.annotations.Test;

import com.qmetry.qaf.automation.core.ConfigurationManager;
import com.qmetry.qaf.automation.data.MetaData;
import com.qmetry.qaf.automation.ui.WebDriverTestBase;

@MetaData("{'feature':'Salesforce Lighting Tests'}")
public class SFTests {

	@MetaData("{'TestCaseID':'TC01")
	@Test(description = "Covert Leads to Opportunity")
	public void ConvertLeadToOpportunity() {
		scenario().given("user is on application landing page", () -> {
			get("/");
			new WebDriverTestBase().getDriver().manage().window().maximize();
		}).when("user do login to salesforce", () -> {
			sendKeys(ConfigurationManager.getBundle().getString("username"),"login.username.input");
			sendKeys(ConfigurationManager.getBundle().getString("password"),"login.password.input");
			click("login.signin.button");
		}).then("verify user logged in successfully", () -> {
			verifyPresent("home.q4pipeline.text");
		}).when("user moves leads to an opportunity", () -> {
			click("home.q4lead.item1.list");
			click("home.q4movel2o.button");
			click("home.q4lead.item2.list");
			click("home.q4movel2o.button");
		}).then("verify message", () -> {
			verifyText("home.q4box.label", "Added values are: Acme corp,Soylent Corp");
		}).execute();
	}
	@MetaData("{'TestCaseID':'TC02")
	@Test(description = "Convert Opportunity to Lead",dependsOnMethods="ConvertLeadToOpportunity")
	public void ConvertOpportunityToLead() {
		scenario().when("user moves an opportunity to lead", () -> {
			click("home.q4opportunity.item1.list");
			click("home.q4moveo2l.button");
			click("home.q4opportunity.item2.list");
			click("home.q4moveo2l.button");
		}).then("verify message", () -> {
			verifyText("home.q4box.label", "Added values are: none");
		}).execute();
	}
}
