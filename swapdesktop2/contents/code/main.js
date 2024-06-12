/*
*   Copyright (c) 2024 Daniël Cox <danielcox16@gmail.com>
*
*   This program is free software; you can redistribute it and/or modify
*   it under the terms of the GNU Lesser General Public License as published by
*   the Free Software Foundation; either version 3.0 of the License, or
*   (at your option) any later version.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*/

function get_current_desktop_index() {
    // Return index of current desktop
    var current_index = workspace.desktops.indexOf(workspace.currentDesktop);
    return current_index;
}


function add_desktop_abs(index) {
    // Create a new desktop at index (absolute)
    workspace.createDesktop(index, "New Desktop");
}


function add_desktop(relative_index) {
    // Create a new virtual desktop relative to current index
    add_desktop_abs(get_current_desktop_index() + relative_index);
}


function swap_desktop_abs(index1, index2) {
    // Checks all windows and swaps desktops at given indices (absolute)
    // Note: Doesn't check if desktops at those indices exist

    // Initialize
    all_desktops = workspace.desktops;
    all_windows = workspace.windowList();
    desktop1_windows = [];
    desktop2_windows = [];
    desktop1 = all_desktops[index1];
    desktop2 = all_desktops[index2];

    // Make lists of windows on desktop1 and desktop2
    for (var w = 0; w<all_windows.length; w++) {
        window = all_windows[w];
        if (window.desktops[0] == desktop1) {
            desktop1_windows.push(window);
        } else if (window.desktops[0] == desktop2) {
            desktop2_windows.push(window);
        }
    }

    // Swap desktop of the relevant windows
    desktop1_windows.forEach(function (window) {window.desktops[0] = desktop2});
    desktop2_windows.forEach(function (window) {window.desktops[0] = desktop1});
}


function swap_desktop(relative_index) {
    // Swap desktops
    current_index = get_current_desktop_index();
    new_index = current_index + relative_index;

    if (new_index < 0) {
        add_desktop_abs(0);
        current_index++;
        new_index++;
    } else if (new_index == workspace.desktops.length) {
        add_desktop_abs(workspace.desktops.length);
    }
    swap_desktop_abs(current_index, new_index);
}


if (registerShortcut) {                                         /* Check if the register function actually exists */
    
    registerShortcut("Swap with Next Desktop (temp4)",                  /* Register shortcut for 'swap with next desktop' */
                     "swapdesktop2: Swap current desktop with next one (temp4)",
                     "Meta+Shift+Alt+Right",
                     function() {swap_desktop(1);});
    
    registerShortcut("Swap with Previous Desktop (temp4)",              /* Register shortcut for 'swap with previous desktop' */
                     "swapdesktop2: Swap current desktop with previous one (temp4)",
                     "Meta+Shift+Alt+Left",
                     function() {swap_desktop(-1);});

    registerShortcut("Swap with Above Desktop (temp4)",                 /* Register shortcut for 'swap with above desktop' */
                     "swapdesktop2: Swap current desktop with one above (temp4)",
                     "Meta+Shift+Alt+Up",
                     function() {swap_desktop(-workspace.desktopGridWidth);});
    
    registerShortcut("Swap with Below Desktop (temp4)",                 /* Register shortcut for 'swap with below desktop' */
                     "swapdesktop2: Swap current desktop with one below (temp4)",
                     "Meta+Shift+Alt+Down",
                     function() {swap_desktop(workspace.desktopGridWidth);});
    
    registerShortcut("Add Desktop After Current (temp4)",                             /* Register shortcut for 'add desktop' */
                     "swapdesktop2: Add new desktop between current and next (temp4)",
                     "Meta+Alt++",
                     function() {add_desktop(1);});
    
    registerShortcut("Add Desktop Before Current (temp4)",                             /* Register shortcut for 'add desktop' */
                     "swapdesktop2: Add new desktop between previous and current (temp4)",
                     "Meta+Alt+=",
                     function() {add_desktop(0);});

    registerShortcut("Remove Desktop (temp4)",                          /* Register shortcut for 'remove desktop' */
                     "swapdesktop2: Remove current desktop and move its windows to the next (temp4)",
                     "Meta+Alt+-",
                     function() {workspace.removeDesktop(workspace.currentDesktop);});
}
