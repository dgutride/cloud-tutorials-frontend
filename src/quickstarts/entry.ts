import React from "react";
import ReactDOM from "react-dom";
import QuickStartDrawer from "./components/QuickStartDrawer";
import VanillaChildren from "./components/VanillaChildren";
import { TutorialBreadcrumb } from './components/Breadcrumb';

declare const QUICKSTARTS_BASE: string;
declare const APP_BASE: string;
const tutorialHeaderHeight = 44;

const queryParams = new URLSearchParams(window.location.search);
const searchQuery = queryParams.get("quickstart");
if (searchQuery) {
  fetch(`${QUICKSTARTS_BASE}/${searchQuery}.json`)
    .then((res) => res.json())
    .then((json) => {
      const successEvent = new CustomEvent("tutorial-load-success", {
        detail: json
      });
      document.dispatchEvent(successEvent);
    })
    .catch((error) => {
      console.error("Could not fetch quickstart:", searchQuery);
      const errorEvent = new Event("tutorial-load-error");
      document.dispatchEvent(errorEvent);
    });
}

function makeDiv(
  className: string | string[],
  styles?: { [key: string]: string | number }
) {
  const div = document.createElement("div");
  if (Array.isArray(className)) {
    div.className = className.join(" ");
  } else {
    div.className = className;
  }
  if (styles) {
    for (const property in styles) {
      // @ts-ignore
      div.style[property] = styles[property];
    }
  }
  return div;
}

function copyAttrs(src: HTMLElement, target: HTMLElement) {
  for (let name of src.getAttributeNames()) {
    let value = src.getAttribute(name);
    if (value && target.getAttributeNames().indexOf(name) >= 0) {
      // merge the values
      value = value.concat(` ${target.getAttribute(name)}`)
    }
    value && target.setAttribute(name, value);
    src.removeAttribute(name);
  }
}

document.addEventListener(
  "tutorial-load-success",
  function (e) {
    /*
     * First hide the in-built quick starts (if applicable)
     */
    const inBuiltDrawer = document.querySelector(
      ".co-quick-start-panel-content"
    );
    if (inBuiltDrawer) {
      (inBuiltDrawer as HTMLElement).style.display = "none";
    }

    /*
     * Tutorial header
     */
    const tutorialHeader = makeDiv("tut-header pf-u-box-shadow-inset", {
      padding: "10px 16px",
      // background: "#555",
      // color: "#f1f1f1",
      position: "fixed",
      top: 0,
      width: "100%",
    });
    const params = new URLSearchParams(location.search);
    const tutorialPath = params.get('tutorial');
    ReactDOM.render(
      React.createElement(TutorialBreadcrumb, {
        basename: APP_BASE,
        crumbs: tutorialPath?.split('/') || []
      }),
      tutorialHeader
    );

    /*
     * Wrap document body so we can move it to the drawer content
     */
    const wrappedDocBody = makeDiv("tut-doc-body", {
      height: `calc(100vh - ${tutorialHeaderHeight}px)`
    });
    copyAttrs(document.body, wrappedDocBody);
    while (document.body.firstChild) {
      wrappedDocBody.appendChild(document.body.firstChild);
    }

    const tutorialDrawer = makeDiv("tut-drawer", {
      position: "fixed",
      top: `${tutorialHeaderHeight}px`,
      bottom: 0,
    });

    document.body.append(tutorialHeader);
    document.body.append(tutorialDrawer);

    ReactDOM.render(
      React.createElement(QuickStartDrawer, {
        children: React.createElement(VanillaChildren, {}, wrappedDocBody),
        tutorial: (e as CustomEvent).detail
      }),
      tutorialDrawer
    );
  },
  false
);
