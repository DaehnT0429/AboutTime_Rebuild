# FAQ

## Table of Contents

### Setup

  - [Agile terms in gitlab](/infodoc#using-gitlab)
  - [How to setup a Sprint/Milestone](/infodoc#setting-up)

### How to create

  - [How to create subtasks on Issues](/infodoc#create-task)
  - [How to create a Merge Request (From an Issue)](/infodoc#create-mr)
  - [How to create labels for the Issue Board to better track statuses](/infodoc#create-col-labels)
  - [How to create priority labels to better prioritize your issues](/infodoc#create-priority-labels)

### Time

  - [How to **properly** spend time on an Issue/MR](/infodoc#spend-time)
  - [How to create time estimates on Issues/MRs](/infodoc#create-estimates)

### Metrics

  - [Burndown Chart](/infodoc#burndown)

--------------------------------------------------------------------------------

# <a name="using-gitlab"></a> Using Gitlab for Scrum

Scrum Term              | Gitlab Term
----------------------- | ------------------
Sprint                  | Milestone
PBI                     | Issue
Story Points            | Weight
Pull Request (PR)       | Merge Request (MR)
Subtask                 | _[ ] Task_
Jira Functionality      | Issues
Confluence              | Wiki
Bitbucket Functionality | Repository

# <a name="setting-up"></a> Setting up a Sprint / Milestone

1. **Create a Milestone** - Hover over _Issues_ on the left navigation bar of your group page and select 'Milstones'

Here, you will put your beginning and end dates in addition to your Sprint Goal. Note that Milestones CANNOT OVERLAP IN DATES so you must end a milestone the day before you begin a new one.

You must create Milestones at the group level, rather than Milestones that are attached to a specific repo. Group level Milestones work across separate repositories, which is useful if you've divided your code into frontend and backend repositories.

4. **Create Ceremony and Overhead Issues** - we recommend naming them according to your quarter and sprint: Q1 Sprint 1 Ceremonies
5. **Populate Your Product and Spring Backlogs**

For each issue you create in your SPRINT backlog, be sure to add weight, the ToDo label, and select the milestone to associate the issue with.

# <a name="create-task"></a> Creating Task on an Issue

In the description of an issue, `- [ ]` translates to a checkbox, which will show up on the list of issues adjacent to the issue title.

# <a name="create-estimates"></a> Creating Time Estimates

In a comment on the issue you're estimating, write `/estimate 8h`

You can also remove estimates by typing `/remove_estimate`

# <a name="spend-time"></a> Spending Time

Format: message describing your contributions `/spend 1h 2019-03-17`

Note that you must put the `/spend` command on it's own line after the entire rest of the message.

You can subtract time by spending negative hours i.e. `/spend -1h 2019-03-17`

<div class="ui icon message">
  <i class="warning icon">
</i>
  <div class="content">
  <div class="header">Warning: Unspending time can make a mess of time logs</div>
  <p>It can be hard to track where/when you've spent and unspent time when working across several issues. Try to avoid this at all costs.</p>
</div>
</div>

Message: should link to commits, issues, merge requests, and branches as you see fit. You can link to those in the Gitlab comment easily by following this format.

Commit             | Pasting the entire commit number from the branch or MR will automatically create a link
------------------ | ---------------------------------------------------------------------------------------
Issue              | #X where X is the number of the issue
Merge Request (MR) | !X where X is the number of the MR
Label              | ~X where X is the name of the label

# <a name="create-mr"></a> Creating a Merge Request (MR)

From your issue in Gitlab, you may click "Create Merge Request" which will create a branch and corresponding MR in one step. This will automatically connect the issue and MR by placing "Closes #X" in the description of the MR, so the merged MR closes the corresponding issue.

# <a name="create-col-labels"></a> Creating Columns and Labels for Issue Status

i.e. ToDo, In Progress, Needs Review, Done/Merged, Blocked

Visiting the Issue Board for the first time will create your ToDo and Doing columns for you

1. _Add the label_ - Hover over _Issues_ on the left navigation bar and select 'Labels'. Then create a new label.
2. _Add that label to a column on the Issue Board_ - When viewing the Issue Board, click 'Add List' in the upper right hand corner (next to 'Add Issues')

# <a name="create-priority-labels"></a> Creating Priority Labels

We recommend creating labels to arrange the priority of your tasks. You can create a label as described above.

Example: High Priority, Medium Priority, Low Priority

You can the view those labels in your Product Backlog or Issue Board, and you can sort by them (Label Priority)

# <a name="burndown"></a> Burndown Chart View

This is located under the details for the current Milestone

# If you have any additional questions, reference Gitlab's documentation [here](https://about.gitlab.com/2018/03/05/gitlab-for-agile-software-development/)
