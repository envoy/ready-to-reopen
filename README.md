# Ready to Reopen Portal
Jekyll based website for sharing our office reopening plans at [readytoreopen.envoy.com](https://readytoreopen.envoy.com). The majority of data is fed from a Google Sheet, allowing for easy updating of a fairly complex document by multiple people in the organization.

![Portal preview](https://d.pr/i/HD7OxE+)

Looking for resources for your return-to-office plan? Download [Envoy's reopening toolkit](https://envoy.com/content/ebook/ds02/dl/reopening-toolkit-for-workplaces/).

## Customizing for your company
The site pulls data from [this Google Sheet](https://docs.google.com/spreadsheets/d/1wQd772XHgXUodEa1hrsO-HLRIN-wWnZQepq0m-p64Nk/edit?usp=sharing). Since our plan is available to anyone to view, you can open this file and make your own copy by going to **File → Make a copy** in Google Sheets.

*Important:* Feel free to change the content of the phases, but be careful when changing the structure:
* The names of the individual sheets ("Return Phases" and "Current Phases") are used to pull the correct data.
* The first four rows need to stay where they are, but all other rows below that can be shifted around to reorder how content appears on the phase detail pages. That's because we look up specific cells with the row number for the first four rows of data.

### Add your plan details
In the `Return Phases` sheet, add as much or as little detail about the phases of your plan. The site is designed for 5 phases, but you can rename them and even change the indicator color if you'd like. If you need another phase, you might need to tweak the display code.

### Set your locations and current phases
In the `Current Phases` sheet, add your various office locations and then specify what phase each location is in. Set an icon for each. You can add additional SVG icons in `/assets/images` and they'll be used when displaying the current status.

### Update additional static content
Modify the front page resources list by editing `_data/resources.yml`. Content will automatically be formatted into a grid layout. You may also want to tweak content in `/pages/*`, `index.html`, and the site-wide config in `_config.yml`.

## Building the site

### Update the config

After you've updated your content, prep your config file to point at your new Google Sheet. We use a secondary config file (`_config.private.yml`) to store config that we don't want to check in to this repo.

1. Copy `_config.private.yml.sample` to `_config.private.yml`.

2. Update the Google Sheet ID. You can just pull this from the URL of the sheet.

3. Add your API key.

### Getting a Google API key ([source](https://stackoverflow.com/questions/30082277/accessing-a-new-style-public-google-sheet-as-json))

As of v4 API, [all requests must be accompanied](https://developers.google.com/sheets/api/guides/authorizing) by an identifier (e.g. API key):

> Requests to the Google Sheets API for public data must be accompanied by an identifier, which can be an API key or an access token.

Follow the steps in the linked document to create an API key on the [credentials page](https://console.developers.google.com/apis/credentials). Make sure to:

1. Create a new app on Google Cloud Platform.
1. Create a new API key.
1. Add the Google Sheets API. (API Manager > Dashboard > Enable API)

Note that you *do not need* to publish the sheet to the web. All you need to do is make sure **Anyone with the link** can access the sheet. If you're planning to publish this site privately and you do not want the sheet available on the web, you will need to make some changes to use Google's OAuth flow when pulling the data.

### Build and preview
1. Install dependencies by running:
```bash
$ bundle install
```

2. Boot the Jekyll server to build the site.
```bash
$ bundle exec jekyll serve --livereload --config _config.yml,_config.private.yml
```
Note that you need to specify both config files with the `--config` option.

3. Visit [0.0.0.0:4000](0.0.0.0:4000) to view the site.

## Publish the site
When you're ready to deploy, build the site into a static output.

```bash
$ bundle exec jekyll build --config _config.yml,_config.private.yml
```

### Deploying to Cloudflare Workers Sites
We use [Cloudflare Workers Sites](https://workers.cloudflare.com/sites) to host our site. Deploying is simple.

1. [Install `wrangler`](https://developers.cloudflare.com/workers/tooling/wrangler/install) if you don't already have it installed.

1. Update `wrangler.toml` with your account ID, zone ID, routes, and any other config.

1. Preview the site:
```bash
$ wrangler preview -e production
```

1. Publish to production:
```bash
$ wrangler publish -e production
```

## License
This code is made available for others to use under the [BSD 2-Clause license](LICENSE.md).

### Footer text
If publishing your own Ready to Reopen portal for your company, you must retain Envoy's copyright in the source code but you may modify the footer copyright notice that is displayed on the site. The content in our Ready to Reopen plan is offered under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/), but we recognize that some companies may not make their plans available under an open license. If you choose to change the content license, we ask that you retain a note in the footer or elsewhere on the page that links back to our public portal. This would be satisfactory:

> This site was adapted from Envoy's [Ready to Reopen](https://readytoreopen.envoy.com) portal.
