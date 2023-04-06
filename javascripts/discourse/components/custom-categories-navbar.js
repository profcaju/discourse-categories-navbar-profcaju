import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class CustomCategoriesNavbar extends Component {
  @service site;
  @service router;
  @tracked activeSlug = "";

  constructor() {
    super(...arguments);
    this.setActiveSlug();
    this.router.on("routeDidChange", this, this.setActiveSlug);
  }

  setActiveSlug() {
    const currentRoute = this.router.currentRoute;
    Object.entries(currentRoute).forEach((keyValuePair) => {
      //   console.log("  ", ...keyValuePair);
    });
    // console.log("\n");
    // console.log("\n");
    if (currentRoute && currentRoute.parent.name == "topic") {
      let slugParent = $(".topic-category .badge-wrapper").attr("href");
      console.log("estou dentro: " + slugParent);
      document.querySelector('a[href*="' + slugParent + '"]').scrollIntoView({
        block: "nearest",
        inline: "center",
      });
    }

    const container = Discourse.__container__;
    const controller = container.lookup("controller:topic");
    console.log(controller.get("model.category_slug"));

    if (currentRoute && currentRoute.attributes?.category) {
      let activeCategory = currentRoute.attributes.category;

      if (activeCategory.parentCategory) {
        activeCategory = activeCategory.parentCategory;
      }

      this.activeSlug = activeCategory.slug;

      // scroll active category into view
      document
        .querySelector(`a[href*="/c/${this.activeSlug}"]`)
        .scrollIntoView({
          block: "nearest",
          inline: "center",
        });
    }
  }
}
