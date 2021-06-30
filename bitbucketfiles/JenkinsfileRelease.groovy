@Library('iac-library') _

def details = [:]

details.account="ProJNamE"
details.repo_name="iac-cloudops-basetest"
terra_apply(details)
//terra_test()