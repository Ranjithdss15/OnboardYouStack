@Library('iac-library') _

def details = [:]

//details.commitid="$Commit_ID"
details.account="ProJNamE"
details.repo_name="iac-cloudops-basetest"
terra_plan(details)