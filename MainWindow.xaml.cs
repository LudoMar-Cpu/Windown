using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Controls.Primitives;
using Microsoft.UI.Xaml.Data;
using Microsoft.UI.Xaml.Input;
using Microsoft.UI.Xaml.Media;
using Microsoft.UI.Xaml.Navigation;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace App2
{
    /// <summary>
    /// An empty window that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            this.Title = "Widown OS Simulation";
            InitializeWebView();
        }

        private async void InitializeWebView()
        {
            await WidownWebView.EnsureCoreWebView2Async();
            // Reset progression on each build/run
            try
            {
                await WidownWebView.CoreWebView2.Profile.ClearBrowsingDataAsync();
            }
            catch { }

            string htmlPath = System.IO.Path.Combine(AppContext.BaseDirectory, "index.html");
            if (!System.IO.File.Exists(htmlPath))
            {
                htmlPath = System.IO.Path.GetFullPath("index.html");
            }
            if (System.IO.File.Exists(htmlPath))
            {
                WidownWebView.CoreWebView2.Navigate(new Uri(htmlPath).AbsoluteUri);
            }
        }
    }
}
