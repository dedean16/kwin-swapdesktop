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

function swap_desktops(n) {
    // Swap desktops
    print('To be implemented');
}

function get_current_desktop_index() {
    var current_index = workspace.desktops.indexOf(workspace.currentDesktop);
    return current_index;
}

function add_desktop(relative_index) {
    // Create a new virtual desktop at the end of the current set of desktops
    workspace.createDesktop(get_current_desktop_index() + relative_index, "New Desktop");
}


if (registerShortcut) {                                         /* Check if the register function actually exists */
    
    registerShortcut("Swap with Next Desktop",                  /* Register shortcut for 'swap with next desktop' */
                     "swapdesktop2: Swap current desktop with next one (temp)",
                     "Meta+Shift+Alt+Right",
                     function() {swap_desktop(1);});
    
    registerShortcut("Swap with Previous Desktop",              /* Register shortcut for 'swap with previous desktop' */
                     "swapdesktop2: Swap current desktop with previous one (temp)",
                     "Meta+Shift+Alt+Left",
                     function() {swap_desktop(-1);});

    registerShortcut("Swap with Above Desktop",                 /* Register shortcut for 'swap with above desktop' */
                     "swapdesktop2: Swap current desktop with one above (temp)",
                     "Meta+Shift+Alt+Up",
                     function() {swap_desktop(-workspace.desktopGridWidth);});
    
    registerShortcut("Swap with Below Desktop",                 /* Register shortcut for 'swap with below desktop' */
                     "swapdesktop2: Swap current desktop with one below (temp)",
                     "Meta+Shift+Alt+Down",
                     function() {swap_desktop(workspace.desktopGridWidth);});
    
    registerShortcut("Add Desktop",                             /* Register shortcut for 'add desktop' */
                     "swapdesktop2: Add new desktop between previous and current one (temp)",
                     "Meta+Alt++",
                     function() {add_desktop(1);});

    registerShortcut("Remove Desktop",                          /* Register shortcut for 'insert desktop' */
                     "swapdesktop2: Remove current desktop and move its windows to the next (temp)",
                     "Meta+Alt+_",
                     function() {workspace.removeDesktop(workspace.currentDesktop);});
}
